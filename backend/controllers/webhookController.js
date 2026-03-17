const Stripe = require('stripe');
const { Resend } = require('resend');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);
const { recordCustomerPurchase, hasCustomerPurchased, getPromoCodeForAmount } = require('../services/customerService');

const handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('⚠️  Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log('✅ Checkout session completed:', session.id);

    let payload = null;
    if (session.metadata && session.metadata.payload) {
      try {
        payload = JSON.parse(session.metadata.payload);
      } catch (e) {
        console.warn('Impossible de parser metadata.payload', e);
      }
    }

    try {
      const userInfo = payload && payload.userInfo ? payload.userInfo : {};
      const tirageType = payload && payload.tirageType ? payload.tirageType : {};
      const customerEmail = session.customer_email || session.customer_details?.email || userInfo.email;

      // Vérifier si c'est le premier achat
      const isFirstPurchase = customerEmail ? !hasCustomerPurchased(customerEmail) : false;

      // Calculer le montant de l'achat
      const purchaseAmount = session.amount_total / 100; // Convertir de centimes en euros

      // Enregistrer l'achat
      if (customerEmail) {
        recordCustomerPurchase(customerEmail, {
          sessionId: session.id,
          amount: purchaseAmount,
          tirageType: tirageType.tirageType || 'N/A',
          productName: session.line_items?.data[0]?.description || 'Tirage de runes'
        });
      }

      // Préparer le code promo pour les nouveaux clients selon le montant
      const promoCode = isFirstPurchase ? getPromoCodeForAmount(purchaseAmount) : null;

      // Créer l'email de notification admin
      const adminEmailHtml = `
        <h2>🔔 Nouveau paiement reçu sur Secrets des Runes</h2>
        <h3>Informations client</h3>
        <ul>
          <li><strong>Nom :</strong> ${userInfo.nom || 'N/A'}</li>
          <li><strong>Prénom :</strong> ${userInfo.prenom || 'N/A'}</li>
          <li><strong>Email :</strong> ${userInfo.email || customerEmail || 'N/A'}</li>
          <li><strong>Téléphone :</strong> ${userInfo.telephone || 'N/A'}</li>
          <li><strong>Sexe :</strong> ${userInfo.sexe || 'N/A'}</li>
        </ul>
        <h3>Détails du tirage</h3>
        <ul>
          <li><strong>Type :</strong> ${tirageType.tirageType || 'N/A'}</li>
          <li><strong>Thème :</strong> ${tirageType.theme || 'N/A'}</li>
          <li><strong>Question :</strong> ${tirageType.mainQuestion || 'N/A'}</li>
          <li><strong>Montant :</strong> ${purchaseAmount}€</li>
        </ul>
        <h3>Informations Stripe</h3>
        <ul>
          <li><strong>Session ID :</strong> ${session.id}</li>
          <li><strong>Premier achat :</strong> ${isFirstPurchase ? '✅ Oui (Premier achat)' : 'Non (Client récurrent)'}</li>
          <li><strong>Code promo attribué :</strong> ${promoCode || 'N/A'}</li>
        </ul>
      `;

      // Envoi avec Resend
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
        to: process.env.EMAIL_TO || 'lemurmuredesrunes@outlook.fr',
        subject: `💰 Nouveau paiement: ${userInfo.prenom || ''} ${userInfo.nom || ''} - ${purchaseAmount}€`,
        html: adminEmailHtml
      });

      console.log('✅ Email de notification envoyé via Resend.');
      
      // Si c'est le premier achat et qu'on a un email client, envoyer le code promo
      if (isFirstPurchase && customerEmail && promoCode) {
        console.log(`🎁 Premier achat détecté pour ${customerEmail} (${purchaseAmount}€), envoi du code promo: ${promoCode}`);
        
        try {
          const customerName = `${userInfo.prenom || ''} ${userInfo.nom || ''}`.trim() || 'Cher(e) client(e)';
          
          const welcomeEmailHtml = `
            <h2>🎁 Merci pour votre confiance !</h2>
            <p>Bonjour ${customerName},</p>
            <p>Merci pour votre achat de <strong>${purchaseAmount}€</strong> sur Secrets des Runes !</p>
            <p>Pour vous remercier de votre confiance, voici un code promo exclusif pour votre prochaine commande :</p>
            <div style="background-color: #f0f0f0; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; margin: 20px 0;">
              ${promoCode}
            </div>
            <p>Utilisez ce code lors de votre prochain tirage pour bénéficier d'une réduction.</p>
            <p>À très bientôt,<br>
            Le Murmure des Runes</p>
          `;

          await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
            to: customerEmail,
            subject: '🎁 Votre code promo exclusif - Secrets des Runes',
            html: welcomeEmailHtml
          });

          console.log(`✅ Email de bienvenue avec code promo envoyé à ${customerEmail}`);
        } catch (welcomeEmailErr) {
          console.error('Erreur envoi email bienvenue:', welcomeEmailErr);
        }
      }
    } catch (emailErr) {
      console.error('Erreur envoi email webhook:', emailErr);
    }
  } else {
    console.log(`Événement non géré : ${event.type}`);
  }

  res.json({ received: true });
};

module.exports = { handleWebhook };

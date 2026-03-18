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

      // Vérifier si un code promo a été utilisé pour cet achat
      const usedPromoCode = session.total_details?.amount_discount > 0 || 
                            (session.discount && session.discount.coupon) ||
                            (session.discounts && session.discounts.length > 0);

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
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); overflow: hidden; }
            .header { background: linear-gradient(135deg, #4B0082 0%, #8B4513 100%); color: #ffffff; padding: 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 24px; }
            .content { padding: 30px; }
            .section { margin-bottom: 25px; }
            .section h2 { color: #4B0082; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #DAA520; padding-bottom: 5px; }
            .info-table { width: 100%; }
            .info-table td { padding: 8px 0; }
            .info-table td:first-child { font-weight: bold; color: #4B0082; width: 40%; }
            .badge { display: inline-block; padding: 5px 10px; background: #4CAF50; color: white; border-radius: 5px; font-size: 12px; }
            .footer { background: #f8f8f8; padding: 20px; text-align: center; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔔 Nouveau Paiement Reçu</h1>
              <p style="margin: 5px 0 0 0;">Secrets des Runes</p>
            </div>
            <div class="content">
              <div class="section">
                <h2>👤 Informations Client</h2>
                <table class="info-table">
                  <tr><td>Nom :</td><td>${userInfo.nom || 'N/A'}</td></tr>
                  <tr><td>Prénom :</td><td>${userInfo.prenom || 'N/A'}</td></tr>
                  <tr><td>Email :</td><td>${userInfo.email || customerEmail || 'N/A'}</td></tr>
                  <tr><td>Téléphone :</td><td>${userInfo.telephone || 'N/A'}</td></tr>
                  <tr><td>Sexe :</td><td>${userInfo.sexe || 'N/A'}</td></tr>
                </table>
              </div>
              <div class="section">
                <h2>🎴 Détails du Tirage</h2>
                <table class="info-table">
                  <tr><td>Type :</td><td>${tirageType.tirageType || 'N/A'}</td></tr>
                  <tr><td>Thème :</td><td>${tirageType.theme || 'N/A'}</td></tr>
                  <tr><td>Question :</td><td>${tirageType.mainQuestion || 'N/A'}</td></tr>
                  <tr><td>Montant :</td><td><strong style="color: #DAA520; font-size: 18px;">${purchaseAmount}€</strong></td></tr>
                </table>
              </div>
              <div class="section">
                <h2>💳 Informations Stripe</h2>
                <table class="info-table">
                  <tr><td>Session ID :</td><td>${session.id}</td></tr>
                  <tr><td>Premier achat :</td><td>${isFirstPurchase ? '<span class="badge">✅ Oui (Premier achat)</span>' : 'Non (Client récurrent)'}</td></tr>
                  <tr><td>Code promo :</td><td>${promoCode || 'N/A'}</td></tr>
                </table>
              </div>
            </div>
            <div class="footer">
              <p>Email automatique envoyé par secretsdesrunes.com</p>
            </div>
          </div>
        </body>
        </html>
      `;

      // Vérification de la configuration Resend
      console.log('📧 Configuration Resend:', {
        hasApiKey: !!process.env.RESEND_API_KEY,
        apiKeyPrefix: process.env.RESEND_API_KEY?.substring(0, 8),
        fromEmail: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
        toEmail: process.env.EMAIL_TO || 'lemurmuredesrunes@outlook.fr'
      });

      // Envoi avec Resend
      const adminEmailResult = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
        to: process.env.EMAIL_TO || 'lemurmuredesrunes@outlook.fr',
        subject: `💰 Nouveau paiement: ${userInfo.prenom || ''} ${userInfo.nom || ''} - ${purchaseAmount}€`,
        html: adminEmailHtml
      });

      console.log('✅ Email de notification envoyé via Resend:', adminEmailResult);
      
      // Si c'est le premier achat SANS code promo utilisé, envoyer un code promo
      if (isFirstPurchase && customerEmail && promoCode && !usedPromoCode) {
        console.log(`🎁 Premier achat sans code promo pour ${customerEmail} (${purchaseAmount}€), envoi du code: ${promoCode}`);
        
        try {
          const customerName = `${userInfo.prenom || ''} ${userInfo.nom || ''}`.trim() || 'Cher(e) client(e)';
          
          const welcomeEmailHtml = `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 0; }
                .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); overflow: hidden; }
                .header { background: linear-gradient(135deg, #4B0082 0%, #8B4513 100%); color: #ffffff; padding: 40px 30px; text-align: center; }
                .header h1 { margin: 0; font-size: 28px; }
                .content { padding: 40px 30px; }
                .greeting { font-size: 18px; color: #4B0082; margin-bottom: 20px; }
                .promo-box { background: linear-gradient(135deg, #4B0082 0%, #6A0DAD 100%); color: #ffffff; padding: 30px; text-align: center; border-radius: 10px; margin: 30px 0; box-shadow: 0 4px 15px rgba(75, 0, 130, 0.3); }
                .promo-label { font-size: 14px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px; opacity: 0.9; }
                .promo-code { font-size: 36px; font-weight: bold; letter-spacing: 4px; padding: 15px; background: rgba(255, 255, 255, 0.2); border-radius: 5px; margin: 10px 0; }
                .promo-description { font-size: 14px; margin-top: 15px; opacity: 0.9; }
                .message { color: #555; line-height: 1.8; margin: 20px 0; }
                .signature { margin-top: 30px; padding-top: 20px; border-top: 2px solid #f0f0f0; color: #666; }
                .footer { background: #f8f8f8; padding: 20px; text-align: center; color: #666; font-size: 12px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>🎁 Merci pour votre confiance !</h1>
                </div>
                <div class="content">
                  <p class="greeting">Bonjour ${customerName},</p>
                  <p class="message">
                    Merci pour votre achat de <strong style="color: #DAA520;">${purchaseAmount}€</strong> sur Secrets des Runes !
                  </p>
                  <p class="message">
                    Pour vous remercier de votre confiance, voici un code promo exclusif pour votre prochaine commande :
                  </p>
                  <div class="promo-box">
                    <div class="promo-label">Votre Code Promo</div>
                    <div class="promo-code">${promoCode}</div>
                    <div class="promo-description">Utilisez ce code lors de votre prochain tirage</div>
                  </div>
                  <p class="message">
                    Entrez simplement ce code lors du paiement pour bénéficier de votre réduction.
                  </p>
                  <div class="signature">
                    <p>À très bientôt,<br>
                    <strong>Le Murmure des Runes</strong></p>
                  </div>
                </div>
                <div class="footer">
                  <p>Email automatique envoyé par secretsdesrunes.com</p>
                  <p>Si vous avez des questions, n'hésitez pas à nous contacter.</p>
                </div>
              </div>
            </body>
            </html>
          `;

          const welcomeEmailResult = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
            to: customerEmail,
            subject: '🎁 Votre code promo exclusif - Secrets des Runes',
            html: welcomeEmailHtml
          });

          console.log(`✅ Email de bienvenue avec code promo envoyé à ${customerEmail}:`, welcomeEmailResult);
        } catch (welcomeEmailErr) {
          console.error('❌ Erreur détaillée envoi email bienvenue:', welcomeEmailErr);
        }
      }
    } catch (emailErr) {
      console.error('❌ Erreur détaillée envoi email webhook:', emailErr);
      if (emailErr.message) console.error('Message d\'erreur:', emailErr.message);
      if (emailErr.statusCode) console.error('Code HTTP:', emailErr.statusCode);
    }
  } else {
    console.log(`Événement non géré : ${event.type}`);
  }

  res.json({ received: true });
};

module.exports = { handleWebhook };

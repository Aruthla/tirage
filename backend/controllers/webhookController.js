const Stripe = require('stripe');
const emailjs = require('@emailjs/nodejs');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const { recordCustomerPurchase, hasCustomerPurchased, getFirstPurchasePromoCode } = require('../services/customerService');

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

      // Enregistrer l'achat
      if (customerEmail) {
        recordCustomerPurchase(customerEmail, {
          sessionId: session.id,
          amount: session.amount_total / 100,
          tirageType: tirageType.tirageType || 'N/A',
          productName: session.line_items?.data[0]?.description || 'Tirage de runes'
        });
      }

      // Préparer le code promo pour les nouveaux clients
      const promoCode = isFirstPurchase ? getFirstPurchasePromoCode() : null;

      // Envoi avec EmailJS
      const templateParams = {
        to_email: process.env.EMAIL_TO || 'lemurmuredesrunes@outlook.fr',
        session_id: session.id,
        amount: session.amount_total ? `${session.amount_total / 100}€` : 'N/A',
        nom: userInfo.nom || 'N/A',
        prenom: userInfo.prenom || 'N/A',
        email: userInfo.email || customerEmail || 'N/A',
        telephone: userInfo.telephone || 'N/A',
        tirage_type: tirageType.tirageType || JSON.stringify(tirageType),
        is_first_purchase: isFirstPurchase ? 'Oui (Premier achat)' : 'Non (Client récurrent)',
        promo_code: promoCode || 'N/A'
      };

      await emailjs.send(
        process.env.EMAILJS_SERVICE_ID,
        process.env.EMAILJS_TEMPLATE_ID_PAYMENT,
        templateParams,
        {
          publicKey: process.env.EMAILJS_PUBLIC_KEY,
          privateKey: process.env.EMAILJS_PRIVATE_KEY
        }
      );

      console.log('Email de notification envoyé via EmailJS.');
      
      // Si c'est le premier achat et qu'on a un email client, envoyer le code promo
      if (isFirstPurchase && customerEmail && promoCode) {
        console.log(`🎁 Premier achat détecté pour ${customerEmail}, envoi du code promo: ${promoCode}`);
        
        try {
          const welcomeTemplateParams = {
            to_email: customerEmail,
            customer_name: `${userInfo.prenom || ''} ${userInfo.nom || ''}`.trim() || 'Cher(e) client(e)',
            promo_code: promoCode,
            from_name: 'Le Murmure des Runes'
          };

          await emailjs.send(
            process.env.EMAILJS_SERVICE_ID,
            process.env.EMAILJS_TEMPLATE_ID_WELCOME || process.env.EMAILJS_TEMPLATE_ID_PAYMENT,
            welcomeTemplateParams,
            {
              publicKey: process.env.EMAILJS_PUBLIC_KEY,
              privateKey: process.env.EMAILJS_PRIVATE_KEY
            }
          );

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

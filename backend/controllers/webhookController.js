const Stripe = require('stripe');
const emailjs = require('@emailjs/nodejs');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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

      // Envoi avec EmailJS
      const templateParams = {
        to_email: process.env.EMAIL_TO || 'lemurmuredesrunes@outlook.fr',
        session_id: session.id,
        amount: session.amount_total ? `${session.amount_total / 100}€` : 'N/A',
        nom: userInfo.nom || 'N/A',
        prenom: userInfo.prenom || 'N/A',
        email: userInfo.email || 'N/A',
        telephone: userInfo.telephone || 'N/A',
        tirage_type: tirageType.tirageType || JSON.stringify(tirageType)
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
    } catch (emailErr) {
      console.error('Erreur envoi email webhook:', emailErr);
    }
  } else {
    console.log(`Événement non géré : ${event.type}`);
  }

  res.json({ received: true });
};

module.exports = { handleWebhook };

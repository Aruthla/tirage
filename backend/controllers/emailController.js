const emailjs = require('@emailjs/nodejs');
const { getFirstPurchasePromoCode } = require('../services/customerService');

/**
 * Envoie un email de bienvenue avec le code promo au nouveau client
 */
const sendWelcomeEmail = async (req, res) => {
  const { customerEmail, customerName } = req.body;

  if (!customerEmail) {
    return res.status(400).json({ error: 'Email client manquant' });
  }

  try {
    const promoCode = getFirstPurchasePromoCode();

    const templateParams = {
      to_email: customerEmail,
      customer_name: customerName || 'Cher(e) client(e)',
      promo_code: promoCode,
      from_name: 'Le Murmure des Runes'
    };

    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID_WELCOME || process.env.EMAILJS_TEMPLATE_ID_PAYMENT,
      templateParams,
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY,
        privateKey: process.env.EMAILJS_PRIVATE_KEY
      }
    );

    console.log(`Email de bienvenue envoyé à ${customerEmail} avec code promo ${promoCode}`);
    res.json({ success: true, message: 'Email envoyé avec succès' });
  } catch (error) {
    console.error('Erreur envoi email bienvenue:', error);
    res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email' });
  }
};

module.exports = { sendWelcomeEmail };

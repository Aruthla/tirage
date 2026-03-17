const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);
const { getPromoCodeForAmount } = require('../services/customerService');

/**
 * Envoie un email de bienvenue avec le code promo au nouveau client
 */
const sendWelcomeEmail = async (req, res) => {
  const { customerEmail, customerName, purchaseAmount } = req.body;

  if (!customerEmail) {
    return res.status(400).json({ error: 'Email client manquant' });
  }

  if (!purchaseAmount) {
    return res.status(400).json({ error: 'Montant de l\'achat manquant' });
  }

  try {
    const promoCode = getPromoCodeForAmount(purchaseAmount);
    const name = customerName || 'Cher(e) client(e)';

    const welcomeEmailHtml = `
      <h2>🎁 Merci pour votre confiance !</h2>
      <p>Bonjour ${name},</p>
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

    console.log(`Email de bienvenue envoyé à ${customerEmail} avec code promo ${promoCode} (achat: ${purchaseAmount}€)`);
    res.json({ success: true, message: 'Email envoyé avec succès', promoCode });
  } catch (error) {
    console.error('Erreur envoi email bienvenue:', error);
    res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email' });
  }
};

module.exports = { sendWelcomeEmail };

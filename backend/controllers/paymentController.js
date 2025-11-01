const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const { validatePromoCode } = require('../services/stripeProducts');
const { hasCustomerPurchased } = require('../services/customerService');

const createCheckoutSession = async (req, res) => {
  const { priceId, promoCode, customerEmail, metadata } = req.body;

  try {
    // Configuration de base de la session
    const sessionConfig = {
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price: priceId, // Utilise le Price ID du catalogue Stripe
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/tirage?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/tirage?payment=cancel`,
      customer_email: customerEmail,
      metadata: {
        payload: metadata ? JSON.stringify(metadata) : undefined,
        customerEmail: customerEmail
      },
      allow_promotion_codes: true, // Permet d'entrer des codes promo dans Stripe Checkout
    };

    // Si un code promo est fourni, le valider et l'appliquer
    if (promoCode) {
      const promoValidation = await validatePromoCode(promoCode);
      
      if (promoValidation.valid) {
        sessionConfig.discounts = [{
          promotion_code: promoValidation.promoCodeId
        }];
      } else {
        return res.status(400).json({ 
          error: 'Code promo invalide',
          message: promoValidation.message 
        });
      }
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    res.json({ url: session.url });
  } catch (error) {
    console.error('Erreur création session Stripe:', error);
    res.status(500).json({ error: 'Erreur création session Stripe' });
  }
};

const verifyCheckoutSession = async (req, res) => {
  const { sessionId } = req.body;
  if (!sessionId) return res.status(400).json({ verified: false, message: 'sessionId manquant' });

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const verified = session.payment_status === 'paid' || session.status === 'complete';
    
    // Vérifier si c'est le premier achat du client
    const customerEmail = session.customer_email || session.customer_details?.email;
    const isFirstPurchase = customerEmail ? !hasCustomerPurchased(customerEmail) : false;
    
    return res.json({ 
      verified, 
      session,
      isFirstPurchase,
      customerEmail 
    });
  } catch (err) {
    console.error('Erreur récupération session Stripe:', err);
    return res.status(500).json({ verified: false, error: err.message });
  }
};

module.exports = { createCheckoutSession, verifyCheckoutSession };

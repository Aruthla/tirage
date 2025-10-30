const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
  const { amount, metadata } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: { name: 'Tirage de runes' },
            unit_amount: Math.round(Number(amount) * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/tirage?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/tirage?payment=cancel`,
      metadata: {
        payload: metadata ? JSON.stringify(metadata) : undefined,
      },
    });

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
    // verification basique : payment_status === 'paid'
    const verified = session.payment_status === 'paid' || session.status === 'complete';
    return res.json({ verified, session });
  } catch (err) {
    console.error('Erreur récupération session Stripe:', err);
    return res.status(500).json({ verified: false, error: err.message });
  }
};

module.exports = { createCheckoutSession, verifyCheckoutSession };

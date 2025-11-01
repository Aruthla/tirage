const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/**
 * Récupère tous les produits actifs depuis Stripe
 */
async function getActiveProducts() {
  try {
    const products = await stripe.products.list({
      active: true,
      expand: ['data.default_price']
    });

    return products.data.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      images: product.images,
      priceId: product.default_price?.id,
      price: product.default_price?.unit_amount / 100, // Convertir en euros
      currency: product.default_price?.currency
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    throw error;
  }
}

/**
 * Récupère un produit spécifique par son ID
 */
async function getProductById(productId) {
  try {
    const product = await stripe.products.retrieve(productId, {
      expand: ['default_price']
    });

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      images: product.images,
      priceId: product.default_price?.id,
      price: product.default_price?.unit_amount / 100,
      currency: product.default_price?.currency
    };
  } catch (error) {
    console.error('Erreur lors de la récupération du produit:', error);
    throw error;
  }
}

/**
 * Valide un code promo Stripe
 */
async function validatePromoCode(code) {
  try {
    const promoCodes = await stripe.promotionCodes.list({
      code: code,
      active: true,
      limit: 1
    });

    if (promoCodes.data.length === 0) {
      return { valid: false, message: 'Code promo invalide ou expiré' };
    }

    const promoCode = promoCodes.data[0];
    const coupon = promoCode.coupon;

    return {
      valid: true,
      promoCodeId: promoCode.id,
      couponId: coupon.id,
      percentOff: coupon.percent_off,
      amountOff: coupon.amount_off ? coupon.amount_off / 100 : null,
      currency: coupon.currency
    };
  } catch (error) {
    console.error('Erreur lors de la validation du code promo:', error);
    return { valid: false, message: 'Erreur lors de la validation du code' };
  }
}

module.exports = {
  getActiveProducts,
  getProductById,
  validatePromoCode
};

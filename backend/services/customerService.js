// Service de gestion des clients (simplifié sans Firebase pour commencer)
// Utilise un stockage en mémoire pour le développement

// Stockage temporaire en mémoire (sera remplacé par Firebase)
const customers = new Map();

/**
 * Vérifie si un client a déjà effectué un achat
 */
function hasCustomerPurchased(email) {
  return customers.has(email.toLowerCase());
}

/**
 * Enregistre un nouvel achat client
 */
function recordCustomerPurchase(email, purchaseData) {
  const customerEmail = email.toLowerCase();
  
  if (!customers.has(customerEmail)) {
    customers.set(customerEmail, {
      email: customerEmail,
      firstPurchaseDate: new Date().toISOString(),
      purchases: []
    });
  }

  const customer = customers.get(customerEmail);
  customer.purchases.push({
    date: new Date().toISOString(),
    ...purchaseData
  });

  return customer;
}

/**
 * Récupère les informations d'un client
 */
function getCustomer(email) {
  return customers.get(email.toLowerCase()) || null;
}

/**
 * Génère un code promo pour un nouveau client
 * Note: Le code doit être créé dans Stripe au préalable
 */
function getFirstPurchasePromoCode() {
  // Retourne le code promo à utiliser (doit correspondre à un code créé dans Stripe)
  return process.env.FIRST_PURCHASE_PROMO_CODE || 'MERCI10';
}

module.exports = {
  hasCustomerPurchased,
  recordCustomerPurchase,
  getCustomer,
  getFirstPurchasePromoCode
};

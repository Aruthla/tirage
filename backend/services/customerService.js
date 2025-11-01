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
 * Génère un code promo pour un nouveau client selon le montant de son achat
 * Mapping des montants vers les codes promo
 */
function getPromoCodeForAmount(amount) {
  // Convertir le montant en nombre si c'est une chaîne
  const purchaseAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  // Mapping des tranches de prix vers les codes promo
  // RUNE1 = 10% réduction pour tirage 10€
  // RUNE3 = 15% réduction pour tirage 22€
  // RUNE4 = 20% réduction pour tirage 30€
  // RUNE6 = 25% réduction pour tirage 45€
  
  if (purchaseAmount >= 45) {
    return 'RUNE6'; // Pour tirage 6 runes (45€)
  } else if (purchaseAmount >= 30) {
    return 'RUNE4'; // Pour tirage 4 runes (30€)
  } else if (purchaseAmount >= 22) {
    return 'RUNE3'; // Pour tirage 3 runes (22€)
  } else if (purchaseAmount >= 10) {
    return 'RUNE1'; // Pour tirage 1 rune (10€)
  }
  
  // Par défaut, retourner RUNE1
  return process.env.FIRST_PURCHASE_PROMO_CODE || 'RUNE1';
}

module.exports = {
  hasCustomerPurchased,
  recordCustomerPurchase,
  getCustomer,
  getPromoCodeForAmount
};

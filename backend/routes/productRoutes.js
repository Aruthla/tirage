const express = require('express');
const router = express.Router();
const { getActiveProducts, getProductById } = require('../services/stripeProducts');

// Récupérer tous les produits actifs
router.get('/products', async (req, res) => {
  try {
    const products = await getActiveProducts();
    res.json({ products });
  } catch (error) {
    console.error('Erreur récupération produits:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des produits' });
  }
});

// Récupérer un produit spécifique
router.get('/products/:id', async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    res.json({ product });
  } catch (error) {
    console.error('Erreur récupération produit:', error);
    res.status(404).json({ error: 'Produit non trouvé' });
  }
});

module.exports = router;

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const paymentRoutes = require('./routes/paymentRoutes');
const { handleWebhook } = require('./controllers/webhookController');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Route webhook doit être déclarée AVANT le parseur JSON global
app.post('/api/webhook', express.raw({ type: 'application/json' }), handleWebhook);

app.use(express.json());
app.use('/api', paymentRoutes);

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

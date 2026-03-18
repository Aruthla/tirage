import React, { useState } from 'react';
import '../styles/Payment.scss';

const Payment = ({ onSuccess, onBack, amount, userInfo, tirageType }) => {
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  const [promoCode, setPromoCode] = useState('');
  const [showPromoField, setShowPromoField] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mapping des tirages vers les Price IDs Stripe
  const PRICE_IDS = {
    'Tirage 1 rune : Conseil': 'price_1SMDDiGvX29juSo5Gd8tWJOq',
    'Tirage 1 rune : Futur': 'price_1SMDEKGvX29juSo5n3KnRwYp',
    'Tirage 3 runes : Passé, Présent, Futur': 'price_1SME3uGvX29juSo5WknK2sOe',
    'Tirage 3 runes : Présent, Futur, Conseil': 'price_1SME51GvX29juSo57ovCjevA',
    'Tirage 4 runes : Question personnalisée': 'price_1SME5KGvX29juSo5XZ80Gc4P',
    'Tirage 6 runes : Question approfondie': 'price_1SOhbcGvX29juSo5PcZgKeqT',
  };

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      
      // Récupérer le Price ID correspondant au tirage
      const priceId = PRICE_IDS[tirageType.tirageType] || PRICE_IDS['Tirage 1 rune : Conseil'];

      console.log('Price ID utilisé:', priceId);
      console.log('Type de tirage:', tirageType.tirageType);
      console.log('API URL:', API_URL);

      if (!priceId || priceId.includes('undefined')) {
        setIsLoading(false);
        alert('Erreur de configuration : Price ID manquant. Veuillez contacter le support.');
        console.error('Price IDs disponibles:', PRICE_IDS);
        return;
      }

      // Sauvegarde complète pour restauration après redirection Stripe
      const pending = { userInfo, tirageType, amount };
      localStorage.setItem('pendingPayment', JSON.stringify(pending));

      const requestBody = { 
        priceId,
        promoCode: promoCode.trim() || undefined,
        customerEmail: userInfo.email,
        metadata: pending 
      };

      console.log('Envoi de la requête:', requestBody);

      const res = await fetch(`${API_URL}/api/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      const data = await res.json();
      console.log('Réponse du serveur:', data);
      
      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        setIsLoading(false);
        console.error('Erreur serveur:', data);
        alert(data.message || data.error || 'Erreur lors de la création de la session de paiement.');
      }
    } catch (err) {
      setIsLoading(false);
      console.error('Erreur lors de la création de la session Stripe :', err);
      alert("Le paiement n'a pas pu être initialisé. Veuillez réessayer.");
    }
  };

  return (
    <div className="payment">
      <h2>Étape 3 : Paiement</h2>
      <p>Montant : <strong>{amount} €</strong></p>

      {/* Champ code promo */}
      <div className="promo-section">
        {!showPromoField ? (
          <button 
            type="button" 
            className="show-promo-btn"
            onClick={() => setShowPromoField(true)}
          >
            J'ai un code promo 🎁
          </button>
        ) : (
          <div className="promo-input-group">
            <input
              type="text"
              placeholder="Entrez votre code promo"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
              className="promo-input"
            />
            <small className="promo-hint">💡 Après votre premier achat sans code promo, vous recevrez un code exclusif par email pour votre prochain tirage offert !</small>
          </div>
        )}
      </div>

      <div className="payment-buttons">
        <button onClick={handleCheckout} disabled={isLoading}>
          {isLoading ? '⏳ Traitement en cours...' : 'Payer avec Stripe'}
        </button>
      </div>

      {isLoading && (
        <div className="loading-message">
          <p>🔄 Préparation de votre paiement sécurisé...</p>
          <p className="loading-note">Veuillez patienter, vous allez être redirigé vers Stripe</p>
        </div>
      )}

      <button onClick={onBack} disabled={isLoading}>Précédent</button>
    </div>
  );
};

export default Payment;

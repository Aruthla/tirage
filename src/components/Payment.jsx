import React from 'react';
import '../styles/Payment.scss';

const Payment = ({ onSuccess, onBack }) => {
  const handlePayment = (method) => {
    // Tu peux ici intégrer PayPal, Stripe ou autre système réel plus tard
    console.log(`Paiement effectué via ${method}`);
    onSuccess();
  };

  return (
    <div className="payment">
      <h2>Étape 3 : Paiement</h2>
      <p>Choisissez votre méthode de paiement :</p>
      <div className="payment-buttons">
        <button onClick={() => handlePayment('Carte Bleue')}>Payer par Carte Bleue</button>
        <button onClick={() => handlePayment('PayPal')}>Payer avec PayPal</button>
      </div>
      <button onClick={onBack}>Précédent</button>
    </div>
  );
};

export default Payment;

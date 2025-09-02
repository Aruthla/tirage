import React, { useEffect, useRef } from 'react';
import '../styles/Payment.scss';

const Payment = ({ onSuccess, onBack, amount }) => {
  const paypalRef = useRef();

  useEffect(() => {
    if (!window.paypal) return;

    window.paypal.Buttons({
      createOrder: (data, actions) => {
        // Appel à ton backend pour créer la commande PayPal
        return fetch('/api/create-paypal-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount }),
        })
          .then(res => res.json())
          .then(data => data.orderID);
      },
      onApprove: (data) => {
        // Capture de la commande côté backend
        return fetch('/api/capture-paypal-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderID: data.orderID }),
        })
          .then(res => res.json())
          .then(details => {
            console.log('✅ Paiement confirmé:', details);
            onSuccess(); // passe à l'étape suivante
          });
      },
      onError: (err) => {
        console.error('❌ Erreur de paiement PayPal :', err);
        alert("Le paiement a échoué, veuillez réessayer.");
      },
    }).render(paypalRef.current);
  }, [amount, onSuccess]);

  return (
    <div className="payment">
      <h2>Étape 3 : Paiement</h2>
      <p>Montant : <strong>{amount} €</strong></p>
      <div className="paypal-container" ref={paypalRef}></div>
      <button onClick={onBack}>Précédent</button>
    </div>
  );
};

export default Payment;

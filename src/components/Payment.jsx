import React, { useState } from 'react';
import '../styles/Payment.scss';

const Payment = ({ nextStep, prevStep, data, onChange }) => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSelect = (e) => {
    setSelectedMethod(e.target.value);
  };

  const handlePayment = (e) => {
    e.preventDefault();
    if (!selectedMethod) {
      alert('Veuillez sélectionner un mode de paiement.');
      return;
    }

    // Simulation de traitement
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onChange({ paiementEffectue: true, methodePaiement: selectedMethod });
      nextStep();
    }, 1000); // 1 sec de délai simulé
  };

  return (
    <form onSubmit={handlePayment} className="payment-step">
      <h2>Méthode de paiement</h2>

      <div className="payment-options">
        <label>
          <input
            type="radio"
            name="paiement"
            value="paypal"
            checked={selectedMethod === 'paypal'}
            onChange={handleSelect}
          />
          PayPal
        </label>

        <label>
          <input
            type="radio"
            name="paiement"
            value="cb"
            checked={selectedMethod === 'cb'}
            onChange={handleSelect}
          />
          Carte Bancaire
        </label>
      </div>

      <div className="form-nav">
        <button type="button" onClick={prevStep} className="btn back">
          Retour
        </button>
        <button type="submit" className="btn next" disabled={isProcessing}>
          {isProcessing ? 'Traitement...' : 'Payer'}
        </button>
      </div>
    </form>
  );
};

export default Payment;

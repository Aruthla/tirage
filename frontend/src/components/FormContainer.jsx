import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import UserInfo from './UserInfo.jsx';
import TirageType from './TirageType.jsx';
import Payment from './Payment.jsx';
import RuneSelection from './RuneSelection.jsx';
import Confirmation from './Confirmation.jsx';

const FormContainer = () => {
  const [step, setStep] = useState(1);

  const [userInfo, setUserInfo] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    sexe: ''
  });

  const [tirageType, setTirageType] = useState('');
  const [selectedRunes, setSelectedRunes] = useState([]);
  const [isPaymentDone, setIsPaymentDone] = useState(false);

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleUserInfoSubmit = (data) => {
    // Renommer 'genre' en 'sexe' pour l'email
    const userInfoData = {
      ...data,
      sexe: data.genre || data.sexe
    };
    delete userInfoData.genre;
    delete userInfoData.accepteConditions;
    
    setUserInfo(userInfoData);
    nextStep();
  };

  const handleTirageTypeSubmit = (type) => {
    setTirageType(type);
    nextStep();
  };

  const handlePaymentSuccess = () => {
    setIsPaymentDone(true);
    nextStep();
  };

  const handleRuneSelection = (runes) => {
    setSelectedRunes(runes);
    nextStep();
  };

  const getPriceFromTirage = (type) => {
    const label = typeof type === 'string' ? type : type.tirageType || '';

    if (label.includes('1 rune')) return 10;
    if (label.includes('3 runes')) return 22;
    if (label.includes('4 runes')) return 30;
    if (label.includes('6 runes')) return 45;
    return 0;
  };

  const finalFormData = {
    ...userInfo,
    tirageType,
    runes: selectedRunes,
    modePaiement: isPaymentDone ? 'Carte bancaire' : 'Gratuit'
  };

  // Restauration après redirection Stripe avec vérification serveur-side
  const location = useLocation();
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paymentStatus = params.get('payment');
    const sessionId = params.get('session_id');

    if (paymentStatus === 'success' && sessionId) {
      // appeler le backend pour vérifier la session Stripe
      (async () => {
        try {
          const res = await fetch(`${API_URL}/api/verify-session`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId })
          });
          const json = await res.json();

          if (res.ok && json.verified) {
            // restauration safe depuis localStorage
            const pending = localStorage.getItem('pendingPayment');
            if (pending) {
              try {
                const parsed = JSON.parse(pending);
                if (parsed.userInfo) setUserInfo(parsed.userInfo);
                if (parsed.tirageType) setTirageType(parsed.tirageType);
              } catch (e) {
                console.error('Erreur parse pendingPayment', e);
              }
            }
            setIsPaymentDone(true);
            setStep(4); // sélection des runes
            localStorage.removeItem('pendingPayment');
          } else {
            console.error('Vérification paiement échouée', json);
            alert("Le paiement n'a pas été confirmé côté serveur. Si le problème persiste, contactez le support.");
            localStorage.removeItem('pendingPayment');
          }
        } catch (err) {
          console.error('Erreur vérification session:', err);
          alert("Impossible de vérifier le paiement. Réessayez ou contactez le support.");
          localStorage.removeItem('pendingPayment');
        }
      })();
    } else if (paymentStatus === 'cancel') {
      localStorage.removeItem('pendingPayment');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  return (
    <div className="form-container">
      {step === 1 && <UserInfo onNext={handleUserInfoSubmit} />}
      {step === 2 && <TirageType onNext={handleTirageTypeSubmit} onBack={prevStep} />}
      {step === 3 && (
        <Payment
          amount={getPriceFromTirage(tirageType)}
          onSuccess={handlePaymentSuccess}
          onBack={prevStep}
          userInfo={userInfo}
          tirageType={tirageType}
        />
      )}
      {step === 4 && isPaymentDone && (
        <RuneSelection
          tirageType={tirageType}
          onSelect={handleRuneSelection}
          onBack={prevStep}
        />
      )}
      {step === 5 && <Confirmation formData={finalFormData} />}
    </div>
  );
};

export default FormContainer;

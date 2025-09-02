import React, { useState } from 'react';
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
    telephone: ''
  });

  const [tirageType, setTirageType] = useState('');
  const [selectedRunes, setSelectedRunes] = useState([]);
  const [isPaymentDone, setIsPaymentDone] = useState(false);

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleUserInfoSubmit = (data) => {
    setUserInfo(data);
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

  // Version souple : accepte "1 rune", "1-rune", "tirage 1 rune", etc.
  const getPriceFromTirage = (type) => {
    const label = typeof type === 'string' ? type : type.tirageType || '';
  
    if (label.includes('1 rune')) return 10;
    if (label.includes('3 runes')) return 22;
    if (label.includes('4 runes')) return 30;
    return 0;
  };

  const finalFormData = {
    ...userInfo,
    tirageType,
    runes: selectedRunes
  };

  return (
    <div className="form-container">
      {step === 1 && <UserInfo onNext={handleUserInfoSubmit} />}
      {step === 2 && <TirageType onNext={handleTirageTypeSubmit} onBack={prevStep} />}
      {step === 3 && (
        <Payment
          amount={getPriceFromTirage(tirageType)}
          onSuccess={handlePaymentSuccess}
          onBack={prevStep}
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

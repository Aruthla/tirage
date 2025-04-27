import React, { useState } from 'react';
import UserInfo from './UserInfo';
import TirageType from './TirageType';
import Payement from './Payment';
import RuneSelection from './RuneSelection';
import Confirmation from './Confirmation';

const FormContainer = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    tirageType: '',
    sousQuestions: [],
    contexte: '',
    tirageRunes: [],
    paiementEffectue: false,
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const updateFormData = (newData) => {
    setFormData(prev => ({
      ...prev,
      ...newData,
    }));
  };

  return (
    <div className="form-container">
      {step === 1 && (
        <UserInfo
          nextStep={nextStep}
          data={formData}
          onChange={updateFormData}
        />
      )}

      {step === 2 && (
        <TirageType
          nextStep={nextStep}
          prevStep={prevStep}
          data={formData}
          onChange={updateFormData}
        />
      )}

      {step === 3 && (
        <Payement
          nextStep={nextStep}
          prevStep={prevStep}
          data={formData}
          onChange={updateFormData}
        />
      )}

      {step === 4 && (
        <RuneSelection
          nextStep={nextStep}
          prevStep={prevStep}
          data={formData}
          onChange={updateFormData}
        />
      )}

      {step === 5 && (
        <Confirmation
          prevStep={prevStep}
          data={formData}
        />
      )}
    </div>
  );
};

export default FormContainer;

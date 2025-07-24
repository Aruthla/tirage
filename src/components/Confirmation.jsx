import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Confirmation.scss';

const Confirmation = ({ formData }) => {
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const formatRunes = (runes) => {
    return runes.map(rune => rune.isReversed ? `${rune.name} (inversée)` : rune.name).join(', ');
  };

  useEffect(() => {
    const sendData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/form', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error('Échec de l’envoi du formulaire');

        setIsSent(true);
      } catch (err) {
        setError(err.message);
      }
    };

    sendData();
  }, [formData]);

  const handleReturnHome = () => {
    navigate('/');
  };

  return (
    <div className="confirmation">
      <h2>Confirmation</h2>

      {isSent ? (
        <p>Votre tirage a bien été envoyé. Merci ! 🙏</p>
      ) : error ? (
        <p className="error">Erreur : {error}</p>
      ) : (
        <p>Envoi en cours...</p>
      )}

      <div className="resume">
        <h3>Résumé :</h3>
        <p><strong>Nom :</strong> {formData.nom}</p>
        <p><strong>Prénom :</strong> {formData.prenom}</p>
        <p><strong>Email :</strong> {formData.email}</p>
        {formData.telephone && <p><strong>Téléphone :</strong> {formData.telephone}</p>}
        {formData.sexe && <p><strong>Sexe :</strong> {formData.sexe}</p>}
        {formData.modePaiement && <p><strong>Paiement :</strong> {formData.modePaiement}</p>}

        {formData.tirageType?.tirageType && (
          <p><strong>Type de tirage :</strong> {formData.tirageType.tirageType}</p>
        )}

        {formData.tirageType?.questions?.length > 0 && (
          <p><strong>Sous-question(s) sélectionnée(s) :</strong> {formData.tirageType.questions.join(', ')}</p>
        )}

        <p><strong>Runes tirées :</strong> {formatRunes(formData.runes)}</p>
      </div>

      <div className="navigation-buttons">
        <button type="button" onClick={handleReturnHome}>Retour à l’accueil</button>
      </div>
    </div>
  );
};

export default Confirmation;

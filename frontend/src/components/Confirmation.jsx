import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Confirmation.scss';

const Confirmation = ({ formData }) => {
  const [isSent, setIsSent] = useState(true); // Toujours true car le backend gère l'envoi
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const formatRunes = (runes) => {
    return runes.map(rune => 
      rune.isReversed ? `${rune.name} (inversée)` : rune.name
    ).join(', ');
  };

  // L'envoi d'email est maintenant géré par le webhook Stripe backend
  // Pas besoin d'envoyer depuis le frontend

  const handleReturnHome = () => {
    navigate('/');
  };

  return (
    <div className="confirmation">
      <h2>Confirmation</h2>

      {isSent ? (
        <>
          <p className="success-message">Votre tirage a bien été envoyé. Merci ! 🙏</p>
          <div className="email-notice">
            <p>📧 <strong>Important :</strong> Vous allez recevoir un email avec votre interprétation des runes.</p>
            <p className="delay-info">
              ⏱️ La réception peut prendre quelques minutes, voire jusqu'à une heure dans certains cas. 
              Pensez à vérifier vos <strong>courriers indésirables / spams</strong> si vous ne le voyez pas dans votre boîte principale.
            </p>
          </div>
        </>
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
          <p><strong>Sous-question(s) :</strong> {formData.tirageType.questions.join(', ')}</p>
        )}

        {formData.tirageType?.theme && (
          <p><strong>Thème :</strong> {formData.tirageType.theme}</p>
        )}

        {formData.tirageType?.mainQuestion && (
          <p><strong>Question :</strong> {formData.tirageType.mainQuestion}</p>
        )}

        <p><strong>Runes tirées :</strong> {formatRunes(formData.runes)}</p>
      </div>

      <div className="navigation-buttons">
        <button type="button" onClick={handleReturnHome}>Retour à l'accueil</button>
      </div>
    </div>
  );
};

export default Confirmation;
import React, { useState } from 'react';
import '../styles/Confirmation.scss';

const Confirmation = ({ data, prevStep }) => {
  const [isSent, setIsSent] = useState(false);

  const handleSend = () => {
    // TODO : Remplacer ceci par l'envoi réel avec backend ou service d'email
    console.log('📩 Données à envoyer :', data);
    setIsSent(true);
  };

  if (isSent) {
    return (
      <div className="confirmation-message">
        <h2>✅ Votre tirage a bien été envoyé !</h2>
        <p>Un e-mail de confirmation a été transmis au praticien.</p>
        <p>Merci pour votre confiance 🙏</p>
      </div>
    );
  }

  return (
    <div className="confirmation-step">
      <h2>📋 Récapitulatif</h2>
      
      <div className="summary-box">
        <h3>Informations personnelles :</h3>
        <p><strong>Nom :</strong> {data.nom}</p>
        <p><strong>Prénom :</strong> {data.prenom}</p>
        <p><strong>Email :</strong> {data.email}</p>
        {data.telephone && <p><strong>Téléphone :</strong> {data.telephone}</p>}
      </div>

      <div className="summary-box">
        <h3>Type de tirage :</h3>
        <p>{data.tirageType.replace(/_/g, ' ')}</p>
        {data.sousQuestions?.length > 0 && (
          <>
            <h4>Sous-questions :</h4>
            <ul>
              {data.sousQuestions.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ul>
            {data.contexte && <p><strong>Contexte :</strong> {data.contexte}</p>}
          </>
        )}
      </div>

      <div className="summary-box">
        <h3>Runes tirées :</h3>
        <ul>
          {data.tirageRunes.map((rune, i) => (
            <li key={i}>
              {i + 1}. {rune.name} {rune.reversed ? '🔄 (Inversée)' : ''}
            </li>
          ))}
        </ul>
      </div>

      <div className="form-nav">
        <button onClick={prevStep} className="btn back">Retour</button>
        <button onClick={handleSend} className="btn next">Envoyer</button>
      </div>
    </div>
  );
};

export default Confirmation;

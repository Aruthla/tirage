import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import '../styles/Confirmation.scss';

const Confirmation = ({ formData }) => {
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const formatRunes = (runes) => {
    return runes.map(rune => 
      rune.isReversed ? `${rune.name} (inversée)` : rune.name
    ).join(', ');
  };

  useEffect(() => {
    const sendData = async () => {
      try {
        // Formatage des questions selon le type de tirage
        let questionsText = 'Aucune';
        if (formData.tirageType?.questions?.length > 0) {
          // Cas tirage 4 runes avec sous-questions
          questionsText = formData.tirageType.questions.join(', ');
        } else if (formData.tirageType?.theme && formData.tirageType?.mainQuestion) {
          // Cas tirage 1 ou 3 runes avec thème et question libre
          questionsText = `Thème: ${formData.tirageType.theme} - Question: ${formData.tirageType.mainQuestion}`;
        }

        const templateParams = {
          to_email: process.env.REACT_APP_EMAIL_TO || 'lemurmuredesrunes@outlook.fr',
          from_name: `${formData.prenom} ${formData.nom}`,
          nom: formData.nom,
          prenom: formData.prenom,
          email: formData.email,
          telephone: formData.telephone || 'Non fourni',
          sexe: formData.sexe || 'Non spécifié',
          mode_paiement: formData.modePaiement || 'Non spécifié',
          tirage_type: formData.tirageType?.tirageType || 'Non spécifié',
          questions: questionsText,
          runes: formatRunes(formData.runes),
          subject: 'Nouveau tirage de runes'
        };

        await emailjs.send(
          process.env.REACT_APP_EMAILJS_SERVICE_ID,
          process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
          templateParams,
          process.env.REACT_APP_EMAILJS_PUBLIC_KEY
        );

        setIsSent(true);
      } catch (err) {
        console.error('Erreur EmailJS:', err);
        setError(err.text || err.message || 'Échec de l\'envoi');
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
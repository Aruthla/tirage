import React, { useEffect } from 'react';
import '../styles/Consultation.scss';

const Consultation = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="consultation">
      <div className="consultation-container">
        <h1>Consultation Runique en Visio</h1>
        <p className="subtitle-seo">Séance personnalisée de 1h15 - 50€</p>

        <div className="consultation-hero">
          <div className="hero-content">
            <h2>🔮 Une expérience unique et personnalisée</h2>
            <p>
              Découvrez une consultation runique approfondie en visioconférence, 
              où nous explorerons ensemble les messages des runes pour éclairer votre chemin.
            </p>
          </div>
        </div>

        <div className="consultation-details">
          <div className="detail-card">
            <div className="icon">⏰</div>
            <h3>Durée</h3>
            <p className="highlight">1h15</p>
            <p>Un moment d'échange privilégié pour approfondir votre questionnement</p>
          </div>

          <div className="detail-card">
            <div className="icon">💰</div>
            <h3>Tarif</h3>
            <p className="highlight">50€</p>
            <p>Paiement sécurisé par carte bancaire</p>
          </div>

          <div className="detail-card">
            <div className="icon">🌍</div>
            <h3>Depuis chez vous</h3>
            <p className="highlight">En ligne</p>
            <p>Via Google Meet, dans le confort de votre espace</p>
          </div>
        </div>

        <div className="consultation-includes">
          <h2>✨ Ce que comprend la consultation</h2>
          <ul>
            <li>
              <strong>Tirage de runes en direct</strong> - Je tire les runes devant vous et nous explorons ensemble leur signification
            </li>
            <li>
              <strong>Échange personnalisé</strong> - Un dialogue authentique pour affiner l'interprétation selon votre situation
            </li>
            <li>
              <strong>Conseils pratiques</strong> - Des pistes concrètes pour intégrer les messages des runes dans votre quotidien
            </li>
          </ul>
        </div>

        <div className="booking-section">
          <h2>📅 Réserver votre consultation</h2>
          <p className="booking-intro">
            Choisissez le créneau qui vous convient. Les horaires s'affichent automatiquement 
            dans votre fuseau horaire local.
          </p>
          
          <div 
            className="calendly-inline-widget" 
            data-url="https://calendly.com/lemurmuredesrunes/consultation-runique-en-visio"
            style={{ minWidth: '320px', height: '700px' }}
          ></div>
        </div>

        <div className="faq-section">
          <h2>❓ Questions fréquentes</h2>
          
          <div className="faq-item">
            <h3>Comment se déroule la visio ?</h3>
            <p>
              Après votre réservation, vous recevrez un lien Google Meet par email. 
              Il vous suffira de cliquer dessus à l'heure prévue.
            </p>
          </div>

          <div className="faq-item">
            <h3>Que dois-je préparer ?</h3>
            <p>
              Prévoyez un endroit calme où vous ne serez pas dérangé. Préparez vos questions 
              à l'avance, mais restez ouvert aux messages que les runes voudront vous transmettre.
            </p>
          </div>

          <div className="faq-item">
            <h3>Puis-je annuler ou modifier mon rendez-vous ?</h3>
            <p>
              Oui, vous pouvez annuler ou reporter votre consultation jusqu'à 24h avant 
              le rendez-vous sans frais via le lien dans votre email de confirmation.
            </p>
          </div>

          <div className="faq-item">
            <h3>Je suis dans un autre fuseau horaire</h3>
            <p>
              Pas de souci ! Le système de réservation affiche automatiquement les créneaux 
              disponibles dans votre fuseau horaire local.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consultation;

import React from 'react';
import '../styles/Contact.scss';

const Contact = () => {
  return (
    <div className="contact">
      <div className="contact-container">
        <h1>Nous Contacter</h1>
        <p className="subtitle-seo">Questions sur les Tirages de Runes</p>
        <p className="subtitle">Une question ? Besoin d'aide ? N'hésitez pas à nous contacter !</p>

        <div className="contact-content">
          <div className="contact-card">
            <div className="icon">📧</div>
            <h2>Par email</h2>
            <p>Pour toute question concernant nos tirages, nos produits ou pour toute demande particulière :</p>
            <a href="mailto:lemurmuredesrunes@outlook.fr" className="email-link">
              lemurmuredesrunes@outlook.fr
            </a>
          </div>

          <div className="contact-card">
            <div className="icon">⏱️</div>
            <h2>Délai de réponse</h2>
            <p>Nous nous efforçons de répondre à tous vos messages dans un délai de :</p>
            <div className="response-time">24 à 48 heures</div>
            <p className="note">(hors week-ends et jours fériés)</p>
          </div>

          <div className="contact-card">
            <div className="icon">🔮</div>
            <h2>Après votre tirage</h2>
            <p>Vous recevrez votre interprétation par email. Pensez à vérifier :</p>
            <ul>
              <li>Votre boîte de réception</li>
              <li>Votre dossier spam/courrier indésirable</li>
            </ul>
            <p className="note">Si vous ne recevez rien sous 48h, contactez-nous !</p>
          </div>
        </div>

        <div className="social-section">
          <h2>Retrouvez-nous aussi sur :</h2>
          <div className="social-links">
            <a
              href="https://www.instagram.com/secrets.des.runes/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link instagram"
            >
              <span className="icon">📸</span>
              <div className="link-content">
                <strong>Instagram</strong>
                <small>@secrets.des.runes</small>
              </div>
            </a>

            <a
              href="https://lemurmuredesrunes.etsy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link etsy"
            >
              <span className="icon">🛍️</span>
              <div className="link-content">
                <strong>Boutique Etsy</strong>
                <small>Bijoux runiques & Livre</small>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

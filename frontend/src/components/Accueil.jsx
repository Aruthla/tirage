import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Accueil.scss';

const Accueil = () => {
  return (
    <div className="accueil">
      {/* Décorations fixes sur les côtés */}
      <div className="side-decoration left-decoration">
        <img src={`${process.env.PUBLIC_URL}/Depositphotos_247091878_XL.jpg`} alt="Décoration nordique" />
      </div>
      <div className="side-decoration right-decoration">
        <img src={`${process.env.PUBLIC_URL}/Depositphotos_247091878_XL.jpg`} alt="Décoration nordique" />
      </div>

      <div className="hero-section">
        <img src={`${process.env.PUBLIC_URL}/tirage runes.jpg`} alt="Tirage de runes" className="decoration-image top-decoration" />
        <h1>Tirage de Runes en Ligne</h1>
        <p className="subtitle-seo">Divination et Guidance Spirituelle</p>
        <p className="quote">« Les runes sont des murmures anciens qui nous rappellent ce que notre âme sait déjà. »</p>
        
        <div className="intro-text">
          <p>Les runes sont d'anciens symboles issus des traditions germano-scandinaves.</p>
          <p>Utilisées à l'origine comme alphabet, elles sont aussi porteuses d'une dimension symbolique et spirituelle profonde.</p>
          <p>Le tirage de runes permet d'obtenir un éclairage sur une situation, de mieux comprendre certaines dynamiques personnelles et d'ouvrir de nouvelles perspectives.</p>
          <p>Ce site met à votre disposition des tirages de runes inspirés de la tradition nordique, pour vous accompagner dans votre réflexion et votre cheminement personnel.</p>
        </div>

        <div className="accueil-buttons">
          <Link to="/tirage">
            <button>Démarrer un tirage</button>
          </Link>
        </div>
      </div>

      {/* Section Bio */}
      <div className="bio-section">
        <h2>À propos</h2>
        <div className="bio-content">
          <img src={`${process.env.PUBLIC_URL}/IMG_9859.jpg`} alt="Isabelle - Le Murmure des Runes" className="profile-photo" />
          <div className="bio-text">
            <p>
              Je suis <strong>Isabelle</strong>, passionnée depuis de nombreuses années par les runes et la mythologie nordique.
            </p>
            <p>
              À travers ce site, je souhaite partager cette passion, proposer des tirages personnalisés pour mieux se comprendre, 
              éclaircir une situation, ou trouver des réponses et des pistes de réflexion face aux questions de la vie.
            </p>
            <p>
              Les runes sont pour moi un outil de guidance et de connexion, qui nous invite à écouter ce que la sagesse ancienne 
              a encore à nous transmettre aujourd'hui.
            </p>
          </div>
        </div>
      </div>

      {/* Section Découvrir Plus */}
      <div className="discover-section">
        <h2>✨ Découvrez l'univers des Runes</h2>
        <p>Bijoux runiques, livres et bien plus encore...</p>
        
        <div className="social-buttons">
          <a
            href="https://lemurmuredesrunes.etsy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link etsy"
            title="Boutique Etsy - Bijoux runiques et livre"
          >
            <span className="icon">🛍️</span>
            <div className="link-content">
              <strong>Boutique Etsy</strong>
              <small>Bijoux runiques & Livre</small>
            </div>
          </a>

          <a
            href="https://www.amazon.fr/Runes-Comprendre-Pratiquer-Tirages/dp/2959753402"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link amazon"
            title="Acheter le livre sur Amazon"
          >
            <span className="icon">📚</span>
            <div className="link-content">
              <strong>Livre sur Amazon</strong>
              <small>Runes : Comprendre & Pratiquer</small>
            </div>
          </a>

          <a
            href="https://www.instagram.com/secrets.des.runes/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link instagram"
            title="Suivez-nous sur Instagram"
          >
            <span className="icon">📸</span>
            <div className="link-content">
              <strong>Instagram</strong>
              <small>@secrets.des.runes</small>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Accueil;

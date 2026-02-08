import React from 'react';
import '../styles/Vente.scss';

const Vente = () => {
  return (
    <div className="livre">
      <div className="livre-container">
        <h1>Livre sur les Runes</h1>
        <p className="subtitle-seo">Guide Complet de Divination Runique</p>
        
        <div className="livre-content">
          <div className="livre-description">
            <h2>✨ Découvrez notre guide complet</h2>
            <p>
              Plongez dans l'univers fascinant des runes avec ce guide pratique et accessible à tous.
            </p>
            <p>
              <strong>Au programme :</strong>
            </p>
            <ul>
              <li>📖 L'histoire et la signification de chaque rune</li>
              <li>🔮 Des méthodes de tirage détaillées et illustrées</li>
              <li>💡 Des conseils pour interpréter vos tirages</li>
              <li>🌟 Des exercices pratiques pour approfondir votre connexion</li>
            </ul>
            <p>
              Que vous soyez débutant ou pratiquant confirmé, ce livre vous accompagnera dans votre cheminement runique.
            </p>
          </div>
        </div>

        <div className="livre-buttons">
          <a
            href="https://www.amazon.fr/Runes-Comprendre-Pratiquer-Tirages/dp/2959753402"
            target="_blank"
            rel="noopener noreferrer"
            className="amazon-link"
          >
            📚 Commander sur Amazon
          </a>
          <a
            href="https://lemurmuredesrunes.etsy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="etsy-link"
          >
            🛍️ Découvrir sur Etsy
          </a>
        </div>

        <img 
          src={`${process.env.PUBLIC_URL}/Tableau rune.jpg`} 
          alt="Tableau des runes" 
          className="rune-image" 
        />
      </div>
    </div>
  );
};

export default Vente;

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Accueil.scss';

const Accueil = () => {
  return (
    <div className="accueil">
      <h1>Bienvenue sur le site de Tirage de Runes</h1>
      <p>Découvrez ce que les runes ont à vous révéler.</p>
      <div className="accueil-buttons">
        <Link to="/tirage">
          <button>Démarrer un tirage</button>
        </Link>
        <Link to="/vente">
          <button>Découvrir notre livre</button>
        </Link>
      </div>
    </div>
  );
};

export default Accueil;

import React from 'react';
import '../styles/Vente.scss';

const Vente = () => {
  return (
    <div className="livre">
      <h2>Découvrez notre livre sur les Runes</h2>
      <p>
        Apprenez à interpréter les runes, découvrez leur histoire et approfondissez votre
        pratique avec notre guide complet.
      </p>
      <a
        href="https://www.amazon.fr/votre-lien-amazon"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button>Commander sur Amazon</button>
      </a>
    </div>
  );
};

export default Vente;

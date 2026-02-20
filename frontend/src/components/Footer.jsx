import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-main">
        <p>&copy; {new Date().getFullYear()} Le Murmure des Runes. Tous droits réservés.</p>

        <div className="footer-links">
          <Link to="/cgv">Conditions Générales de Vente</Link>
          <Link to="/politique-confidentialite">Politique de Confidentialité</Link>

          {/* Liens externes */}
          <a
            href="https://lemurmuredesrunes.etsy.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Etsy - Bijoux runiques et livre"
            title="Boutique Etsy - Bijoux runiques et livre"
          >
            🛍️ Etsy
          </a>

          <a
            href="https://www.amazon.fr/Runes-Comprendre-Pratiquer-Tirages/dp/2959753402"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Amazon - Le livre des Runes"
            title="Acheter le livre sur Amazon"
          >
            📚 Amazon
          </a>

          <a
            href="https://www.instagram.com/secrets.des.runes/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram - Secrets des Runes"
            title="Suivez-nous sur Instagram"
          >
            📸 Instagram
          </a>
        </div>
      </div>

      <div className="footer-credit">
        <p>
          Site créé par{' '}
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            title="Laëtitia Borde - Développeuse web"
          >
            Laëtitia Borde
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

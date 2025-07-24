import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Tirage de Runes. Tous droits réservés.</p>
      <Link to="/cgv">Conditions Générales de Vente</Link>
    </footer>
  );
};

export default Footer;

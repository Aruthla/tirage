import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.scss';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={`${process.env.PUBLIC_URL}/corbeau.png`} alt="Le Murmure des Runes" />
        <span className="logo-text">Le Murmure des Runes</span>
      </div>
      <div className="nav-links">
        <Link to="/">Accueil</Link>
        <Link to="/tarifs">Tarifs</Link>
        <Link to="/tirage">Tirage</Link>
        <Link to="/consultation">Consultation</Link>
        <Link to="/vente">Vente</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;

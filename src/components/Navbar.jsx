import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.scss';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">Tirage de Runes</h1>
      <div className="nav-links">
        <Link to="/">Accueil</Link>
        <Link to="/tirage">Tirage</Link>
        <Link to="/vente">Vente</Link>
      </div>
    </nav>
  );
};

export default Navbar;

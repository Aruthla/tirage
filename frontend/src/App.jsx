import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Accueil from './components/Accueil';
import Vente from './components/Vente';
import Tarifs from './components/Tarifs';
import Contact from './components/Contact';
import Blog from './components/Blog';
import BlogArticle from './components/BlogArticle';
import FormContainer from './components/FormContainer'; // ou ton composant principal
import Conditions from './components/Conditions';
import PolitiqueConfidentialite from './components/PolitiqueConfidentialite';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.scss';

const App = () => {
  return (
    <Router basename="/">
      <div className="app-container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/vente" element={<Vente />} />
            <Route path="/tarifs" element={<Tarifs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />
            <Route path="/tirage" element={<FormContainer />} />
            <Route path="/cgv" element={<Conditions />} />
            <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

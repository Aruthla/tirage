import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Accueil from './components/Accueil';
import Vente from './components/Vente';
import FormContainer from './components/FormContainer'; // ou ton composant principal
import Conditions from './components/Conditions';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/vente" element={<Vente />} />
        <Route path="/tirage" element={<FormContainer />} />
        <Route path="/cgv" element={<Conditions />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Tarifs.scss';

const Tarifs = () => {
  const tirages = [
    {
      title: "Tirage 1 rune : Conseil",
      price: "10€",
      description: "Un conseil simple et direct pour éclairer votre journée",
      features: [
        "1 rune tirée",
        "Interprétation détaillée",
        "Conseil personnalisé",
        "Réponse rapide"
      ]
    },
    {
      title: "Tirage 1 rune : Futur",
      price: "10€",
      description: "Une perspective sur ce qui vous attend",
      features: [
        "1 rune tirée",
        "Vision du futur proche",
        "Interprétation détaillée",
        "Guidance spirituelle"
      ]
    },
    {
      title: "Tirage 3 runes : Passé, Présent, Futur",
      price: "22€",
      description: "Comprenez votre cheminement dans le temps",
      features: [
        "3 runes tirées",
        "Vision temporelle complète",
        "Connexion des énergies",
        "Analyse approfondie"
      ],
      popular: true
    },
    {
      title: "Tirage 3 runes : Présent, Futur, Conseil",
      price: "22€",
      description: "Éclairage sur votre situation actuelle et à venir",
      features: [
        "3 runes tirées",
        "Focus sur l'action",
        "Conseil pratique",
        "Guidance concrète"
      ]
    },
    {
      title: "Tirage 4 runes : Question personnalisée",
      price: "30€",
      description: "Un tirage sur mesure pour votre questionnement personnel",
      features: [
        "4 runes tirées",
        "Thème de votre choix",
        "4 questions personnalisées",
        "Analyse personnalisée détaillée"
      ]
    },
    {
      title: "Tirage 6 runes : Question approfondie",
      price: "45€",
      description: "L'exploration la plus complète pour un questionnement profond",
      features: [
        "6 runes tirées",
        "Thème de votre choix",
        "Un questionnement unique et approfondi",
        "Structure : Passé, Présent, Obstacle, Aide, Futur, Conseil",
        "Développement complet de votre situation",
        "Analyse très approfondie et détaillée"
      ],
      premium: true
    }
  ];

  return (
    <div className="tarifs">
      <div className="tarifs-header">
        <h1>Tarifs Tirage de Runes</h1>
        <p className="subtitle-seo">Consultations de 10€ à 45€</p>
        <p className="subtitle">Choisissez le tirage qui correspond à vos besoins</p>
      </div>

      <div className="tarifs-grid">
        {tirages.map((tirage, index) => (
          <div 
            key={index} 
            className={`tirage-card ${tirage.popular ? 'popular' : ''} ${tirage.premium ? 'premium' : ''}`}
          >
            {tirage.popular && <div className="badge">Populaire</div>}
            {tirage.premium && <div className="badge premium-badge">Premium</div>}
            
            <h2>{tirage.title}</h2>
            <div className="price">{tirage.price}</div>
            <p className="description">{tirage.description}</p>
            
            <ul className="features">
              {tirage.features.map((feature, idx) => (
                <li key={idx}>
                  <span className="check">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="tarifs-cta">
        <p>Prêt à découvrir ce que les runes ont à vous révéler ?</p>
        <Link to="/tirage">
          <button className="cta-button">Commencer un tirage</button>
        </Link>
      </div>
    </div>
  );
};

export default Tarifs;

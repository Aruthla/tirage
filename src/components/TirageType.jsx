import React, { useState } from 'react';
import '../styles/TirageType.scss';

const TirageType = ({ onNext, onBack }) => {
  const [selectedType, setSelectedType] = useState('');
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const tirages = [
    'Tirage 1 rune : Conseil',
    'Tirage 1 rune : Futur',
    'Tirage 3 runes : Passé, Présent, Futur',
    'Tirage 3 runes : Présent, Futur, Conseil',
    'Tirage 4 runes : Question personnalisée'
  ];

  const questionCategories = {
    Travail: [
      'Vers quoi s’oriente ce projet ?',
      'Quelles compétences devrais-je développer pour avancer dans ma carrière ?',
      'Comment suis-je perçu dans cette relation professionnelle ?'
    ],
    Études: [
      'Comment va se dérouler cet apprentissage ?',
      'Comment va se dérouler cet examen ?',
      'Comment va se dérouler cette formation ?'
    ],
    Relations: [
      'Est-ce le bon moment pour envisager une relation sentimentale ?',
      'Quelles sont les possibilités d’une relation amoureuse dans les six prochains mois ?',
      'Quelles sont les qualités que je devrais rechercher chez un partenaire ?',
      'Comment puis-je améliorer la situation de ma relation actuelle ?',
      'Quels sont les points forts de notre relation ?',
      'Quels sont les sentiments de l’autre personne à mon égard ?',
      'Comment suis-je perçu dans cette relation sentimentale, amicale, familiale ?'
    ],
    Vie_personnelle: [
      'Quel message l’univers a-t-il pour moi concernant ma croissance spirituelle ?',
      'Quelle transition est inévitable dans ma vie en ce moment ?',
      'Comment dois-je accueillir les changements à venir ?',
      'Comment pourrait se dérouler les prochains mois me concernant ?',
      'À quel obstacle dois-je m’attendre ?',
      'Quelle aide pourrait m’être apportée ?',
      'Quels sont les aspects à considérer avant de prendre ma décision ?'
    ],
    Divers: [
      'Comment va se dérouler ce voyage ?',
      'Comment va se dérouler cet entretien ?',
      'Quel conseil puis-je obtenir des runes en lien avec mon questionnement ?',
      'Comment faire face aux conflits familiaux de manière constructive ?'
    ]
  };

  const AUTRE_QUESTION = 'Autre sous-question non référencée dans la liste.';

  const handleQuestionChange = (e) => {
    const { value, checked } = e.target;
    setSelectedQuestions(prev =>
      checked ? [...prev, value] : prev.filter(q => q !== value)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedType) {
      alert('Veuillez sélectionner un type de tirage.');
    } else if (selectedQuestions.length === 0) {
      alert('Veuillez sélectionner au moins une sous-question.');
    } else {
      onNext({ tirageType: selectedType, questions: selectedQuestions });
    }
  };

  return (
    <form className="tirage-type-form" onSubmit={handleSubmit}>
      <h2>Choisissez un type de tirage</h2>
      {tirages.map((type, index) => (
        <div key={index} className="tirage-option">
          <input
            type="radio"
            id={`tirage-${index}`}
            name="tirageType"
            value={type}
            onChange={(e) => setSelectedType(e.target.value)}
            checked={selectedType === type}
          />
          <label htmlFor={`tirage-${index}`}>{type}</label>
        </div>
      ))}

      <h3>Choisissez au moins une sous-question</h3>
      {Object.entries(questionCategories).map(([category, questions]) => (
        <fieldset key={category} className="question-category">
          <legend>{category.replace('_', ' ')}</legend>
          {questions.map((question, i) => (
            <div key={i} className="question-option">
              <input
                type="checkbox"
                id={`question-${category}-${i}`}
                value={question}
                onChange={handleQuestionChange}
                checked={selectedQuestions.includes(question)}
              />
              <label htmlFor={`question-${category}-${i}`}>{question}</label>
            </div>
          ))}
        </fieldset>
      ))}

      <fieldset className="question-category autre-question">
        <legend>Autre</legend>
        <div className="question-option">
          <input
            type="checkbox"
            id="question-autre"
            value={AUTRE_QUESTION}
            onChange={handleQuestionChange}
            checked={selectedQuestions.includes(AUTRE_QUESTION)}
          />
          <label htmlFor="question-autre">{AUTRE_QUESTION}</label>
        </div>
      </fieldset>

      <div className="navigation-buttons">
        <button type="button" onClick={onBack}>Précédent</button>
        <button type="submit">Suivant</button>
      </div>
    </form>
  );
};

export default TirageType;

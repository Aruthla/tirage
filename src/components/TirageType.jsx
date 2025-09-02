import React, { useState } from 'react';
import '../styles/TirageType.scss';

const TirageType = ({ onNext, onBack }) => {
  const [selectedType, setSelectedType] = useState('');
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);
  const [customQuestions, setCustomQuestions] = useState([]);
  const [theme, setTheme] = useState('');
  const [mainQuestion, setMainQuestion] = useState('');

  const tirages = [
    { label: 'Tirage 1 rune : Conseil', prix: 10 },
    { label: 'Tirage 1 rune : Futur', prix: 10 },
    { label: 'Tirage 3 runes : Passé, Présent, Futur', prix: 22 },
    { label: 'Tirage 3 runes : Présent, Futur, Conseil', prix: 22 },
    { label: 'Tirage 4 runes : Question personnalisée', prix: 30 },
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

  const toggleCategory = (category) => {
    setOpenCategory(prev => (prev === category ? null : category));
  };

  const handleQuestionChange = (e) => {
    const { value, checked } = e.target;

    if (checked && selectedQuestions.length + customQuestions.length >= 4) {
      alert("Vous ne pouvez sélectionner que 4 sous-questions maximum.");
      return;
    }

    setSelectedQuestions(prev =>
      checked ? [...prev, value] : prev.filter(q => q !== value)
    );
  };

  const handleCustomQuestionChange = (index, value) => {
    const updated = [...customQuestions];
    updated[index] = value;
    setCustomQuestions(updated);
  };

  const addCustomQuestion = () => {
    if (selectedQuestions.length + customQuestions.length >= 4) {
      alert("Vous ne pouvez sélectionner que 4 sous-questions maximum.");
      return;
    }
    setCustomQuestions(prev => [...prev, '']);
  };

  const removeCustomQuestion = (index) => {
    const updated = [...customQuestions];
    updated.splice(index, 1);
    setCustomQuestions(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedType) {
      alert('Veuillez sélectionner un type de tirage.');
      return;
    }

    if (selectedType.includes('4 runes')) {
      // cas tirage 4 runes → sous-questions obligatoires
      if (selectedQuestions.length + customQuestions.filter(q => q.trim() !== '').length === 0) {
        alert('Veuillez sélectionner ou écrire au moins une sous-question.');
        return;
      }
      onNext({
        tirageType: selectedType,
        questions: [...selectedQuestions, ...customQuestions.filter(q => q.trim() !== '')],
      });
    } else {
      // cas tirage 1 ou 3 runes → thème + question libre
      if (!theme || !mainQuestion.trim()) {
        alert('Veuillez choisir un thème et écrire votre question.');
        return;
      }
      onNext({
        tirageType: selectedType,
        theme,
        mainQuestion,
      });
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
            value={type.label}
            onChange={(e) => setSelectedType(e.target.value)}
            checked={selectedType === type.label}
          />
          <label htmlFor={`tirage-${index}`}>
            {type.label} — <strong>{type.prix}€</strong>
          </label>
        </div>
      ))}

      {/* Bloc des questions */}
      {selectedType && selectedType.includes('4 runes') ? (
        <div className='question-section'>
          <h3>Choisissez jusqu’à 4 sous-questions</h3>
          {Object.entries(questionCategories).map(([category, questions]) => (
            <div key={category} className="question-category">
              <button
                type="button"
                className="accordion-toggle"
                onClick={() => toggleCategory(category)}
              >
                {category.replace('_', ' ')}
              </button>
              {openCategory === category && (
                <div className="accordion-content">
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
                </div>
              )}
            </div>
          ))}

          <div className="question-category autre-question">
            <button
              type="button"
              className="accordion-toggle"
              onClick={() => toggleCategory('autre')}
            >
              Autre
            </button>
            {openCategory === 'autre' && (
              <div className="accordion-content">
                {customQuestions.map((question, index) => (
                  <div key={index} className="custom-question">
                    <input
                      type="text"
                      value={question}
                      placeholder="Écrivez votre question"
                      onChange={(e) => handleCustomQuestionChange(index, e.target.value)}
                    />
                    <button type="button" onClick={() => removeCustomQuestion(index)}>✕</button>
                  </div>
                ))}
                {customQuestions.length < 4 - selectedQuestions.length && (
                  <button type="button" className="add-question-btn" onClick={addCustomQuestion}>
                    + Ajouter une question
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        selectedType && (
          <div className="question-section theme-section">
            <h3>Votre question</h3>
            <label>Choisissez un thème :</label>
            <select value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option value="">-- Sélectionner un thème --</option>
              {Object.keys(questionCategories).map((cat) => (
                <option key={cat} value={cat}>{cat.replace('_', ' ')}</option>
              ))}
            </select>

            <label>Écrivez votre question :</label>
            <textarea
              value={mainQuestion}
              onChange={(e) => setMainQuestion(e.target.value)}
              placeholder="Décrivez brièvement votre question"
            />
          </div>
        )
      )}

      <div className="navigation-buttons">
        <button type="button" onClick={onBack}>Précédent</button>
        <button type="submit">Suivant</button>
      </div>
    </form>
  );
};

export default TirageType;

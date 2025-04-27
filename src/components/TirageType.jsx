import React, { useState } from 'react';
import '../styles/TirageType.scss';

const tirages = [
  { value: '1_conseil', label: 'Tirage 1 rune : Conseil' },
  { value: '1_futur', label: 'Tirage 1 rune : Futur' },
  { value: '3_ppf', label: 'Tirage 3 runes : Passé, Présent, Futur' },
  { value: '3_pfc', label: 'Tirage 3 runes : Présent, Futur, Conseil' },
  { value: '4_sous_questions', label: 'Tirage 4 runes avec sous-questions' },
];

const sousQuestionsList = [
  "Vers quoi s'oriente...",
  "Comment va se dérouler...",
  "Quel conseil puis-je obtenir...",
  "À quel obstacle dois-je m’attendre ?",
  "Quelle aide pourrait m’être apportée ?",
  "Comment suis-je perçu dans cette relation...",
  "Est-ce le bon moment pour une relation sentimentale ?",
  "Quelles sont les possibilités d’une relation amoureuse...",
  "Quelles qualités devrais-je rechercher chez un partenaire ?",
  "Comment améliorer ma relation actuelle ?",
  "Quels sont les points forts de notre relation ?",
  "Quels sont les sentiments de l’autre personne ?",
  "Quelles compétences développer pour ma carrière ?",
  "Quel message l’univers a-t-il pour ma croissance spirituelle ?",
  "Quels aspects à considérer avant ma décision ?",
  "Comment pourraient se dérouler les prochains mois ?",
  "Quelle transition est inévitable en ce moment ?",
  "Comment accueillir les changements à venir ?",
  "Comment faire face aux conflits familiaux ?",
  "Autre sous-question (à préciser)",
];

const TirageType = ({ nextStep, prevStep, data, onChange }) => {
  const [selectedSub, setSelectedSub] = useState(data.sousQuestions || []);
  const [customSub, setCustomSub] = useState(data.customSub || '');

  const handleTirageChange = (e) => {
    onChange({ tirageType: e.target.value });
  };

  const handleSubChange = (e) => {
    const { value, checked } = e.target;
    let updated = checked
      ? [...selectedSub, value]
      : selectedSub.filter(q => q !== value);
    setSelectedSub(updated);
    onChange({ sousQuestions: updated });
  };

  const handleCustomChange = (e) => {
    setCustomSub(e.target.value);
    onChange({ customSub: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.tirageType === '4_sous_questions' && selectedSub.length === 0) {
      alert('Veuillez sélectionner au moins une sous-question.');
      return;
    }
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit} className="tirage-type-form">
      <fieldset>
        <legend>Quel type de tirage souhaitez-vous ?</legend>
        {tirages.map((tirage) => (
          <div key={tirage.value} className="radio-option">
            <label>
              <input
                type="radio"
                name="tirageType"
                value={tirage.value}
                checked={data.tirageType === tirage.value}
                onChange={handleTirageChange}
              />
              {tirage.label}
            </label>
          </div>
        ))}
      </fieldset>

      {data.tirageType === '4_sous_questions' && (
        <div className="sous-questions">
          <h3>Choisissez au moins une sous-question :</h3>
          {sousQuestionsList.map((q, index) => (
            <div key={index} className="checkbox-option">
              <label>
                <input
                  type="checkbox"
                  value={q}
                  checked={selectedSub.includes(q)}
                  onChange={handleSubChange}
                />
                {q}
              </label>
            </div>
          ))}
          {selectedSub.includes("Autre sous-question (à préciser)") && (
            <div className="custom-sub">
              <label>
                Précisez votre sous-question :
                <textarea
                  value={customSub}
                  onChange={handleCustomChange}
                  rows="3"
                  className="custom-textarea"
                />
              </label>
            </div>
          )}
        </div>
      )}

      <div className="form-nav">
        <button type="button" onClick={prevStep} className="btn back">
          Retour
        </button>
        <button type="submit" className="btn next">
          Suivant
        </button>
      </div>
    </form>
  );
};

export default TirageType;

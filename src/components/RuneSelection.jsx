import React, { useEffect, useState } from 'react';
import '../styles/RuneSelection.scss';

const allRunes = [
  'Fehu', 'Uruz', 'Thurisaz', 'Ansuz', 'Raidho', 'Kenaz', 'Gebo',
  'Wunjo', 'Hagalaz', 'Nauthiz', 'Isa', 'Jera', 'Eihwaz', 'Perthro',
  'Algiz', 'Sowilo', 'Tiwaz', 'Berkano', 'Ehwaz', 'Mannaz', 'Laguz',
  'Ingwaz', 'Dagaz', 'Othala',
];

const reversibleRunes = [
  'ALGIZ', 'ANSUZ', 'EHWAZ', 'FEHU', 'KENAZ', 'LAGUZ', 'MANNAZ',
  'OTHALA', 'PERTHRO', 'RAIDHO', 'THURISAZ', 'TIWAZ', 'URUZ',
  'WUNJO', 'BERKANO'
];

const RuneSelection = ({ nextStep, prevStep, data, onChange }) => {
  const [tirageCount, setTirageCount] = useState(0);
  const [selectedRunes, setSelectedRunes] = useState([]);

  useEffect(() => {
    let count = 1;
    if (data.tirageType?.startsWith('3_')) count = 3;
    if (data.tirageType === '4_sous_questions') count = 4;
    setTirageCount(count);
  }, [data.tirageType]);

  const handleRuneClick = (rune) => {
    const alreadySelected = selectedRunes.find(r => r.name === rune);
    if (alreadySelected) return;

    if (selectedRunes.length < tirageCount) {
      const canBeReversed = reversibleRunes.includes(rune.toUpperCase());
      const isReversed = canBeReversed ? Math.random() > 0.5 : false;
      const newRune = { name: rune, reversed: isReversed };
      const updated = [...selectedRunes, newRune];
      setSelectedRunes(updated);
      onChange({ tirageRunes: updated });
    }
  };

  const handleReset = () => {
    setSelectedRunes([]);
    onChange({ tirageRunes: [] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedRunes.length !== tirageCount) {
      alert(`Veuillez sélectionner ${tirageCount} rune(s).`);
      return;
    }
    nextStep();
  };

  return (
    <div className="rune-step">
      <h2>Sélectionnez {tirageCount} rune{tirageCount > 1 ? 's' : ''}</h2>

      <div className="rune-grid">
        {allRunes.map((rune) => {
          const isSelected = selectedRunes.find(r => r.name === rune);
          return (
            <button
              key={rune}
              type="button"
              className={`rune-tile ${isSelected ? 'selected' : ''}`}
              onClick={() => handleRuneClick(rune)}
              disabled={isSelected || selectedRunes.length >= tirageCount}
            >
              {rune}
            </button>
          );
        })}
      </div>

      {selectedRunes.length > 0 && (
        <div className="selected-display">
          <h3>Runes sélectionnées :</h3>
          <ul>
            {selectedRunes.map((rune, index) => (
              <li key={index}>
                {rune.name} {rune.reversed ? '🔄 (Inversée)' : ''}
              </li>
            ))}
          </ul>
          <button type="button" className="btn reset" onClick={handleReset}>
            Réinitialiser
          </button>
        </div>
      )}

      <div className="form-nav">
        <button type="button" onClick={prevStep} className="btn back">
          Retour
        </button>
        <button type="button" onClick={handleSubmit} className="btn next">
          Valider le tirage
        </button>
      </div>
    </div>
  );
};

export default RuneSelection;

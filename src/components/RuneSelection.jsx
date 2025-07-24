import React, { useState } from 'react';
import '../styles/RuneSelection.scss';

const reversibleRunes = [
  'ALGIZ', 'ANSUZ', 'EHWAZ', 'FEHU', 'KENAZ', 'LAGUZ',
  'MANNAZ', 'OTHALA', 'PERTHRO', 'RAIDHO', 'THURISAZ',
  'TIWAZ', 'URUZ', 'WUNJO', 'BERKANO'
];

const allRunes = [
  'FEHU', 'URUZ', 'THURISAZ', 'ANSUZ', 'RAIDHO', 'KENAZ', 'GEBO',
  'WUNJO', 'HAGALAZ', 'NAUTHIZ', 'ISA', 'JERA', 'EIHWAZ', 'PERTHRO',
  'ALGIZ', 'SOWILO', 'TIWAZ', 'BERKANO', 'EHWAZ', 'MANNAZ',
  'LAGUZ', 'INGWAZ', 'OTHALA', 'DAGAZ'
];

const getRuneCount = (tirageType) => {
  if (typeof tirageType === 'string') {
    if (tirageType.includes('1 rune')) return 1;
    if (tirageType.includes('3 runes')) return 3;
    if (tirageType.includes('4 runes')) return 4;
  }
  return 1;
};

const RuneSelection = ({ tirageType, onSelect, onBack }) => {
  const runeCount = getRuneCount(tirageType);
  const [selectedRunes, setSelectedRunes] = useState([]);

  const toggleRune = (rune) => {
    const isSelected = selectedRunes.find(r => r.name === rune);
    if (isSelected) {
      setSelectedRunes(prev => prev.filter(r => r.name !== rune));
    } else if (selectedRunes.length < runeCount) {
      const isReversible = reversibleRunes.includes(rune);
      const isReversed = isReversible ? Math.random() < 0.5 : false;

      setSelectedRunes(prev => [
        ...prev,
        { name: rune, isReversed }
      ]);
    }
  };

  const handleSubmit = () => {
    if (selectedRunes.length !== runeCount) {
      alert(`Veuillez sélectionner ${runeCount} rune(s).`);
      return;
    }
    onSelect(selectedRunes);
  };

  return (
    <div className="rune-selection">
      <h2>Étape 4 : Sélection des runes ({runeCount} à choisir)</h2>
      <div className="rune-grid">
        {allRunes.map((rune) => {
          const isSelected = selectedRunes.some(r => r.name === rune);
          const runeData = selectedRunes.find(r => r.name === rune);

          return (
            <div
              key={rune}
              className={`rune ${isSelected ? 'selected' : ''}`}
              onClick={() => toggleRune(rune)}
            >
              <span>{rune}</span>
              {isSelected && (
                <span className="rune-state">
                  {runeData?.isReversed ? 'Inversée' : 'Normale'}
                </span>
              )}
            </div>
          );
        })}
      </div>
      <div className="navigation-buttons">
        <button onClick={onBack}>Précédent</button>
        <button onClick={handleSubmit}>Valider le tirage</button>
      </div>
    </div>
  );
};

export default RuneSelection;

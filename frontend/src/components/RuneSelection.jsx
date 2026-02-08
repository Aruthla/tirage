import React, { useState } from 'react'; 
import '../styles/RuneSelection.scss';

const reversibleRunes = [
  'ALGIZ', 'ANSUZ', 'EHWAZ', 'FEHU', 'KENAZ', 'LAGUZ',
  'MANNAZ', 'OTHALA', 'PERTHRO', 'RAIDHO', 'THURISAZ',
  'TIWAZ', 'URUZ', 'WUNJO', 'BERKANO'
];

const runesData = {
  'FEHU': { symbol: 'ᚠ', name: 'Fehu' },
  'URUZ': { symbol: 'ᚢ', name: 'Uruz' },
  'THURISAZ': { symbol: 'ᚦ', name: 'Thurisaz' },
  'ANSUZ': { symbol: 'ᚨ', name: 'Ansuz' },
  'RAIDHO': { symbol: 'ᚱ', name: 'Raidho' },
  'KENAZ': { symbol: 'ᚲ', name: 'Kenaz' },
  'GEBO': { symbol: 'ᚷ', name: 'Gebo' },
  'WUNJO': { symbol: 'ᚹ', name: 'Wunjo' },
  'HAGALAZ': { symbol: 'ᚺ', name: 'Hagalaz' },
  'NAUTHIZ': { symbol: 'ᚾ', name: 'Nauthiz' },
  'ISA': { symbol: 'ᛁ', name: 'Isa' },
  'JERA': { symbol: 'ᛃ', name: 'Jera' },
  'EIHWAZ': { symbol: 'ᛇ', name: 'Eihwaz' },
  'PERTHRO': { symbol: 'ᛈ', name: 'Perthro' },
  'ALGIZ': { symbol: 'ᛉ', name: 'Algiz' },
  'SOWILO': { symbol: 'ᛊ', name: 'Sowilo' },
  'TIWAZ': { symbol: 'ᛏ', name: 'Tiwaz' },
  'BERKANO': { symbol: 'ᛒ', name: 'Berkano' },
  'EHWAZ': { symbol: 'ᛖ', name: 'Ehwaz' },
  'MANNAZ': { symbol: 'ᛗ', name: 'Mannaz' },
  'LAGUZ': { symbol: 'ᛚ', name: 'Laguz' },
  'INGWAZ': { symbol: 'ᛜ', name: 'Ingwaz' },
  'OTHALA': { symbol: 'ᛟ', name: 'Othala' },
  'DAGAZ': { symbol: 'ᛞ', name: 'Dagaz' }
};

const allRunes = Object.keys(runesData);

const getRuneCount = (tirageType) => {
  // Extraire la string si tirageType est un objet { tirageType: "...", ... }
  const label = typeof tirageType === 'string' ? tirageType : tirageType?.tirageType || '';
  
  if (label.includes('6 runes')) return 6;
  if (label.includes('4 runes')) return 4;
  if (label.includes('3 runes')) return 3;
  if (label.includes('1 rune')) return 1;
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
      alert(`Veuillez sélectionner exactement ${runeCount} rune(s).`);
      return;
    }
    onSelect(selectedRunes);
  };

  return (
    <div className="rune-selection">
      <h2>Étape 4 : Sélection des runes ({runeCount} à choisir)</h2>
      <p className="instruction">Cliquez sur les pierres de runes pour les sélectionner</p>
      
      <div className="rune-grid">
        {allRunes.map((rune) => {
          const isSelected = selectedRunes.some(r => r.name === rune);
          const runeData = selectedRunes.find(r => r.name === rune);
          const runeInfo = runesData[rune];

          return (
            <div
              key={rune}
              className={`rune-stone ${isSelected ? 'selected' : ''}`}
              onClick={() => toggleRune(rune)}
            >
              {isSelected ? (
                <>
                  <span className="rune-symbol">{runeInfo.symbol}</span>
                  <span className="rune-state">
                    {runeData?.isReversed ? '↓' : '↑'}
                  </span>
                </>
              ) : (
                <span className="rune-hidden">?</span>
              )}
            </div>
          );
        })}
      </div>

      {(selectedRunes.length > 0) && (
        <div className="rune-info">
          <div className="selected-runes-info">
            <h3>Runes sélectionnées :</h3>
            <div className="selected-list">
              {selectedRunes.map((r, index) => (
                <div key={index} className="selected-rune-detail">
                  <span className="symbol">{runesData[r.name].symbol}</span>
                  <span className="name">{runesData[r.name].name}</span>
                  <span className="state">{r.isReversed ? 'Inversée ↓' : 'Normale ↑'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="navigation-buttons">
        <button onClick={onBack}>Précédent</button>
        <button onClick={handleSubmit}>Valider le tirage</button>
      </div>
    </div>
  );
};

export default RuneSelection;

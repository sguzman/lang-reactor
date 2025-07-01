
import React, { useState } from 'react';
import { Vocabulary, Word } from './types';

interface Props {
  vocabulary: Vocabulary;
  onRemoveWord: (word: Word) => void;
  languageColor: { light: { background: string; text: string }; dark: { background: string; text: string } };
  theme: string;
}

const VocabularyList: React.FC<Props> = ({ vocabulary, onRemoveWord, languageColor, theme }) => {
  const [filter, setFilter] = useState<'all' | 'known' | 'learning'>('all');
  const [tierFilter, setTierFilter] = useState<number | 'all'>('all');

  const filteredVocabulary = vocabulary.filter((word) => {
    const statusMatch = filter === 'all' || word.status === filter;
    const tierMatch = tierFilter === 'all' || word.tier === tierFilter;
    return statusMatch && tierMatch;
  });

  const uniqueTiers = Array.from(new Set(vocabulary.map(word => word.tier))).sort((a, b) => a - b);

  return (
    <div>
      <h2>Vocabulary</h2>
      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('known')}>Known</button>
        <button onClick={() => setFilter('learning')}>Learning</button>
      </div>
      <div>
        <label htmlFor="tier-filter">Tier: </label>
        <select id="tier-filter" onChange={(e) => setTierFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}>
          <option key="all" value="all">All</option>
          {uniqueTiers.map(tier => (
            <option key={tier} value={tier}>{tier}</option>
          ))}
        </select>
      </div>
      <ul style={{ maxHeight: '400px', overflowY: 'auto', listStyle: 'none', padding: 0 }}>
        {filteredVocabulary.map((word, index) => (
          <li 
            key={index} 
            style={{ 
              marginBottom: '10px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'stretch', // Stretch items to fill height
              padding: '0', // Remove padding from li, add to inner div
              overflow: 'hidden', // Ensure border-radius applies correctly
              wordWrap: 'break-word'
            }}
          >
            <div style={{
                flexGrow: 1,
                width: 'calc(5/6 * 100%)', // Approximately 5/6 width
                padding: '15px', // Restore padding here
                backgroundColor: word.status === 'known' ? '#D4EDDA' : '#FFE0B2', // Apply status color here
                color: '#333333',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}>
              <div style={{ marginBottom: '5px' }}>
                <strong>{word.text}</strong> ({word.status}, Tier: {word.tier})
              </div>
              <div style={{ fontSize: '0.9em', color: languageColor?.[theme]?.text || 'black' }}>
                {word.definition}
              </div>
            </div>
            <button 
              onClick={() => onRemoveWord(word)}
              style={{
                width: 'calc(1/6 * 100%)', // Approximately 1/6 width
                backgroundColor: '#FF4D4D', // Red background
                color: 'white', // White 'X'
                border: 'none',
                cursor: 'pointer',
                fontSize: '2em', // Big 'X'
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0, // Prevent shrinking
                padding: '0' // Remove button padding
              }}
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VocabularyList;

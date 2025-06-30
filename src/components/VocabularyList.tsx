
import React, { useState } from 'react';
import { Vocabulary, Word } from './types';

interface Props {
  vocabulary: Vocabulary;
  onRemoveWord: (word: Word) => void;
}

const VocabularyList: React.FC<Props> = ({ vocabulary, onRemoveWord }) => {
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
          <option value="all">All</option>
          {uniqueTiers.map(tier => (
            <option key={tier} value={tier}>{tier}</option>
          ))}
        </select>
      </div>
      <ul>
        {filteredVocabulary.map((word, index) => (
          <li key={index}>
            <strong>{word.text}</strong> ({word.status}, Tier: {word.tier}): {word.definition}
            <button onClick={() => onRemoveWord(word)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VocabularyList;

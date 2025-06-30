
import React, { useState } from 'react';
import { Vocabulary, Word } from './types';

interface Props {
  vocabulary: Vocabulary;
  onRemoveWord: (word: Word) => void;
}

const VocabularyList: React.FC<Props> = ({ vocabulary, onRemoveWord }) => {
  const [filter, setFilter] = useState<'all' | 'known' | 'learning'>('all');

  const filteredVocabulary = vocabulary.filter((word) => {
    if (filter === 'all') return true;
    return word.status === filter;
  });

  return (
    <div>
      <h2>Vocabulary</h2>
      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('known')}>Known</button>
        <button onClick={() => setFilter('learning')}>Learning</button>
      </div>
      <ul>
        {filteredVocabulary.map((word, index) => (
          <li key={index}>
            <strong>{word.text}</strong> ({word.status}): {word.definition}
            <button onClick={() => onRemoveWord(word)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VocabularyList;

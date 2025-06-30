
import React from 'react';
import { Vocabulary } from './types';

interface Props {
  vocabulary: Vocabulary;
}

const VocabularyList: React.FC<Props> = ({ vocabulary }) => {
  return (
    <div>
      <h2>Vocabulary</h2>
      <ul>
        {vocabulary.map((word, index) => (
          <li key={index}>
            <strong>{word.text}</strong> ({word.status}): {word.definition}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VocabularyList;

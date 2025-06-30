
import React from 'react';
import { Word } from './types';

interface Props {
  word: Word | null;
  onClose: () => void;
  onMarkAsKnown: (word: Word) => void;
}

const WordDefinitionModal: React.FC<Props> = ({ word, onClose, onMarkAsKnown }) => {
  if (!word || !word.definition) return null;

  const definitionData = Array.isArray(word.definition) ? word.definition[0] : word.definition;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>{word.text}</h2>
        {definitionData.phonetics && definitionData.phonetics.map((phonetic: any, index: number) => (
          <p key={index}>{phonetic.text}</p>
        ))}
        {definitionData.meanings && definitionData.meanings.map((meaning: any, index: number) => (
          <div key={index}>
            <h3>{meaning.partOfSpeech}</h3>
            {meaning.definitions.map((def: any, defIndex: number) => (
              <p key={defIndex}>- {def.definition}</p>
            ))}
          </div>
        ))}
        {definitionData.origin && <p>Origin: {definitionData.origin}</p>}
        <button onClick={() => onMarkAsKnown(word)}>Mark as Known</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default WordDefinitionModal;

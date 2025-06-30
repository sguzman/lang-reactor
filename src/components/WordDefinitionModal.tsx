
import { Word, DictionaryEntry, Phonetic, Meaning, Definition } from './types';

interface Props {
  word: Word | null;
  onClose: () => void;
  onMarkAsKnown: (word: Word) => void;
}

const WordDefinitionModal: React.FC<Props> = ({ word, onClose, onMarkAsKnown }) => {
  if (!word || !word.definition || word.definition.length === 0) return null;

  const definitionData: DictionaryEntry = Array.isArray(word.definition) ? word.definition[0] : word.definition;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>{word.text}</h2>
        {definitionData.phonetics && definitionData.phonetics.map((phonetic: Phonetic, index: number) => (
          <p key={index}>{phonetic.text}</p>
        ))}
        {definitionData.meanings && definitionData.meanings.map((meaning: Meaning, index: number) => (
          <div key={index}>
            <h3>{meaning.partOfSpeech}</h3>
            {meaning.definitions && meaning.definitions.map((def: Definition, defIndex: number) => (
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

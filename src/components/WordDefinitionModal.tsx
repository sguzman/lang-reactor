
import { Word } from './types';

interface Props {
  word: Word | null;
  onClose: () => void;
  onMarkAsKnown: (word: Word) => void;
}

const WordDefinitionModal: React.FC<Props> = ({ word, onClose, onMarkAsKnown }) => {
  if (!word || !word.definition) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>{word.text}</h2>
        <p>{word.definition}</p>
        <button onClick={() => onMarkAsKnown(word)}>Mark as Known</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default WordDefinitionModal;

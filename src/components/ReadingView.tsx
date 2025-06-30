
import React, { useState } from 'react';
import { Book, Word } from './types';

interface Props {
  book: Book;
  onWordUpdate: (word: Word) => void;
}

const ReadingView: React.FC<Props> = ({ book, onWordUpdate }) => {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  const handleWordClick = (word: string) => {
    setSelectedWord(word);
    // Here you would typically fetch the definition from an API
    const definition = `Definition of ${word}`;
    onWordUpdate({ text: word, status: 'learning', definition });
  };

  return (
    <div>
      <h2>{book.title}</h2>
      <div className="reading-content">
        {book.content.split(/\s+/).map((word, index) => (
          <span key={index} onClick={() => handleWordClick(word)} className="word">
            {word}{' '}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ReadingView;

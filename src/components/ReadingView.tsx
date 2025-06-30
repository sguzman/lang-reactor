
import React, { useState } from 'react';
import { Book, Word } from './types';

interface Props {
  book: Book;
  onWordUpdate: (word: Word) => void;
}

const ReadingView: React.FC<Props> = ({ book, onWordUpdate }) => {
  const [loading, setLoading] = useState(false);

  const handleWordClick = async (word: string) => {
    const cleanedWord = word.replace(/[.,\/#!$%^&*;:{}=\-_`~()]/g, "");
    if (!cleanedWord) return;

    setLoading(true);
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${cleanedWord}`);
      if (!response.ok) {
        throw new Error('Definition not found');
      }
      const data = await response.json();
      const definition = data[0]?.meanings[0]?.definitions[0]?.definition || 'No definition found.';
      onWordUpdate({ text: cleanedWord, status: 'learning', definition });
    } catch (error) {
      console.error("Failed to fetch definition:", error);
      onWordUpdate({ text: cleanedWord, status: 'learning', definition: 'Could not fetch definition.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>{book.title}</h2>
      {loading && <p>Loading definition...</p>}
      <div className="reading-content">
        {book.content.split(/(\s+)/).map((word, index) => {
          if (/\s+/.test(word)) {
            return <span key={index}>{word}</span>;
          }
          return (
            <span key={index} onClick={() => handleWordClick(word)} className="word">
              {word}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default ReadingView;


import React, { useState } from 'react';
import { Book, Word } from './types';

interface Props {
  book: Book;
  onWordUpdate: (word: Word) => void;
  fontSize: number;
  vocabulary: Word[];
  selectedLanguage: string;
}

const ReadingView: React.FC<Props> = ({ book, onWordUpdate, fontSize, vocabulary, selectedLanguage }) => {
  const [loading, setLoading] = useState(false);

  const handleWordClick = async (word: string) => {
    const cleanedWord = word.replace(/[.,\/#!$%^&*;:{}=\-_`~()]/g, "");
    if (!cleanedWord) return;

    setLoading(true);
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/${selectedLanguage}/${cleanedWord}`);
      if (!response.ok) {
        throw new Error('Definition not found');
      }
      const data = await response.json();
      // Pass the full data object to onWordUpdate
      onWordUpdate({ text: cleanedWord, status: 'learning', definition: data });
    } catch (error) {
      console.error("Failed to fetch definition:", error);
      onWordUpdate({ text: cleanedWord, status: 'learning', definition: 'Could not fetch definition.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontSize: `${fontSize}px` }}>
      <h2>{book.title}</h2>
      {loading && <p>Loading definition...</p>}
      <div className="reading-content">
        {book.content.split(/(\s+)/).map((word, index) => {
          if (/\s+/.test(word)) {
            return <span key={index}>{word}</span>;
          }
          const cleanedWord = word.replace(/[.,\/#!$%^&*;:{}=\-_`~()]/g, "");
          const vocabWord = vocabulary.find(w => w.text === cleanedWord);
          const wordClass = vocabWord ? `word ${vocabWord.status}-word` : 'word';

          return (
            <span key={index} onClick={() => handleWordClick(word)} className={wordClass}>
              {word}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default ReadingView;

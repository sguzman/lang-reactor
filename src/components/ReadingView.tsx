
import React, { useState } from 'react';
import { Book, Word } from './types';

interface Props {
  book: Book;
  onWordUpdate: (wordText: string) => void;
  fontSize: number;
  vocabulary: Word[];
}

const ReadingView: React.FC<Props> = ({ book, onWordUpdate, fontSize, vocabulary }) => {

  const handleWordClick = (word: string) => {
    const cleanedWord = word.replace(/[.,\/#!$%^&*;:{}=\-_`~()]/g, "");
    if (!cleanedWord) return;
    onWordUpdate(cleanedWord);
  };

  return (
    <div style={{ fontSize: `${fontSize}px` }}>
      <h2>{book.title}</h2>
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

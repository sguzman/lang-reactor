
import React from 'react';
import { Book, Word } from './types';

interface Props {
  book: Book | null;
  onWordUpdate: (wordText: string) => void;
  fontSize: number;
  vocabulary: Word[];
  currentPage: number;
  linesPerPage: number;
  languageColor: { light: { background: string; text: string }; dark: { background: string; text: string } };
  theme: string;
}

const ReadingView: React.FC<Props> = ({ book, onWordUpdate, fontSize, vocabulary, currentPage, linesPerPage, languageColor, theme }) => {
  if (!book) {
    return <div>Please select a book to read.</div>;
  }

  const handleWordClick = (word: string) => {
    const cleanedWord = word.replace(/[.,\/#!$%^&*;:{}=\-_`~()]/g, "");
    if (!cleanedWord) return;
    onWordUpdate(cleanedWord);
  };

  const lines = book.content.split('\n');
  const startIndex = currentPage * linesPerPage;
  const endIndex = startIndex + linesPerPage;
  const currentLines = lines.slice(startIndex, endIndex);

  return (
    <div style={{ fontSize: `${fontSize}px` }}>
      <h2>{book.title}</h2>
      <div className="reading-content">
        {currentLines.map((line, lineIndex) => (
          <p key={lineIndex}>
            {line.split(/(\s+)/).map((word, wordIndex) => {
              if (/\s+/.test(word)) {
                return <span key={wordIndex}>{word}</span>;
              }
              const cleanedWord = word.replace(/[.,\/#!$%^&*;:{}=\-_`~()]/g, "");
              const vocabWord = vocabulary.find(w => w.text === cleanedWord);
              const wordClass = vocabWord ? `word ${vocabWord.status}-word` : 'word';
              const wordStyle = vocabWord ? { backgroundColor: languageColor?.[theme]?.background || 'white', color: languageColor?.[theme]?.text || 'black' } : {};

              return (
                <span key={wordIndex} onClick={() => handleWordClick(word)} className={wordClass} style={wordStyle}>
                  {word}
                </span>
              );
            })}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ReadingView;


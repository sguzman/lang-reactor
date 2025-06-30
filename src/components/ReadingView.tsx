
import React, { useState, useEffect } from 'react';
import { Book, Word } from './types';

interface Props {
  book: Book;
  onWordUpdate: (wordText: string) => void;
  fontSize: number;
  vocabulary: Word[];
}

const ReadingView: React.FC<Props> = ({ book, onWordUpdate, fontSize, vocabulary }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const linesPerPage = 30; // Number of lines to display per page

  useEffect(() => {
    // Reset to first page when a new book is loaded
    setCurrentPage(0);
  }, [book]);

  const handleWordClick = (word: string) => {
    const cleanedWord = word.replace(/[.,\/#!$%^&*;:{}=\-_`~()]/g, "");
    if (!cleanedWord) return;
    onWordUpdate(cleanedWord);
  };

  const lines = book.content.split('\n');
  const totalPages = Math.ceil(lines.length / linesPerPage);
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

              return (
                <span key={wordIndex} onClick={() => handleWordClick(word)} className={wordClass}>
                  {word}
                </span>
              );
            })}
          </p>
        ))}
      </div>
      <div className="pagination-controls">
        <button onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))} disabled={currentPage === 0}>Previous</button>
        <span>Page {currentPage + 1} of {totalPages}</span>
        <button onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))} disabled={currentPage === totalPages - 1}>Next</button>
      </div>
    </div>
  );
};

export default ReadingView;

import React, { useState, useEffect } from 'react';
import './App.css';
import BookLibrary from './components/BookLibrary';
import ReadingView from './components/ReadingView';
import VocabularyList from './components/VocabularyList';
import LanguageSelector from './components/LanguageSelector';
import WordDefinitionModal from './components/WordDefinitionModal';
import { Book, Vocabulary, Word } from './components/types';

const App = () => {
  const [book, setBook] = useState<Book | null>(null);
  const [vocabulary, setVocabulary] = useState<Vocabulary>(() => {
    const savedVocabulary = localStorage.getItem('vocabulary');
    return savedVocabulary ? JSON.parse(savedVocabulary) : {};
  });
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);

  useEffect(() => {
    localStorage.setItem('vocabulary', JSON.stringify(vocabulary));
  }, [vocabulary]);

  const handleBookUpload = (uploadedBook: Book) => {
    setBook(uploadedBook);
  };

  const handleWordSelect = (word: Word) => {
    setSelectedWord(word);
    // Also add/update it in the vocabulary list immediately
    setVocabulary((prev) => {
        const langVocab = prev[selectedLanguage] || [];
        const existingWord = langVocab.find((w) => w.text === word.text);
        if (existingWord) {
            // If word exists, update its definition but keep status
            return {
                ...prev,
                [selectedLanguage]: langVocab.map((w) =>
                    w.text === word.text ? { ...w, definition: word.definition } : w,
                ),
            };
        }
        // If word is new, add it as 'learning'
        return { ...prev, [selectedLanguage]: [...langVocab, word] };
    });
  };

  const handleMarkAsKnown = (wordToUpdate: Word) => {
    setVocabulary((prev) => {
      const langVocab = prev[selectedLanguage] || [];
      return {
        ...prev,
        [selectedLanguage]: langVocab.map((w) =>
          w.text === wordToUpdate.text ? { ...w, status: 'known' } : w,
        ),
      };
    });
    setSelectedWord(null); // Close modal after marking as known
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  const handleCloseModal = () => {
    setSelectedWord(null);
  };


  return (
    <div className="App">
      <header className="App-header">
        <h1>Language Reactor</h1>
        <LanguageSelector onLanguageChange={handleLanguageChange} />
      </header>
      <main>
        {!book ? (
          <BookLibrary onBookUpload={handleBookUpload} />
        ) : (
          <ReadingView book={book} onWordUpdate={handleWordSelect} />
        )}
        <VocabularyList vocabulary={vocabulary[selectedLanguage] || []} />
        <WordDefinitionModal
          word={selectedWord}
          onClose={handleCloseModal}
          onMarkAsKnown={handleMarkAsKnown}
        />
      </main>
    </div>
  );
};

export default App;
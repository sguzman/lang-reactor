import React, { useState } from 'react';
import './App.css';
import BookLibrary from './components/BookLibrary';
import ReadingView from './components/ReadingView';
import VocabularyList from './components/VocabularyList';
import LanguageSelector from './components/LanguageSelector';
import { Book, Vocabulary, Word } from './components/types';

const App = () => {
  const [book, setBook] = useState<Book | null>(null);
  const [vocabulary, setVocabulary] = useState<Vocabulary>({});
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');

  const handleBookUpload = (uploadedBook: Book) => {
    setBook(uploadedBook);
  };

  const handleWordUpdate = (word: Word) => {
    setVocabulary((prev) => {
      const langVocab = prev[selectedLanguage] || [];
      const existingWord = langVocab.find((w) => w.text === word.text);
      if (existingWord) {
        return {
          ...prev,
          [selectedLanguage]: langVocab.map((w) =>
            w.text === word.text ? word : w,
          ),
        };
      }
      return { ...prev, [selectedLanguage]: [...langVocab, word] };
    });
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
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
          <ReadingView book={book} onWordUpdate={handleWordUpdate} />
        )}
        <VocabularyList vocabulary={vocabulary[selectedLanguage] || []} />
      </main>
    </div>
  );
};

export default App;
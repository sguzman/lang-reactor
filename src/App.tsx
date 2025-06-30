import React, { useState, useEffect } from 'react';
import './App.css';
import BookLibrary from './components/BookLibrary';
import ReadingView from './components/ReadingView';
import VocabularyList from './components/VocabularyList';
import LanguageSelector from './components/LanguageSelector';
import WordDefinitionModal from './components/WordDefinitionModal';
import ReadingSettings from './components/ReadingSettings';
import Layout from './components/Layout';
import { Book, Vocabulary, Word, DictionaryEntry } from './components/types';

const App = () => {
  const [books, setBooks] = useState<Book[]>(() => {
    const savedBooks = localStorage.getItem('books');
    return savedBooks ? JSON.parse(savedBooks) : [];
  });
  const [currentBookId, setCurrentBookId] = useState<string | null>(null);
  const [vocabulary, setVocabulary] = useState<Vocabulary>(() => {
    const savedVocabulary = localStorage.getItem('vocabulary');
    return savedVocabulary ? JSON.parse(savedVocabulary) : {};
  });
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const [wordLists, setWordLists] = useState<{[key: string]: Word[]}>({});

  useEffect(() => {
    const loadWordList = async () => {
      try {
        const response = await fetch(`/words/${selectedLanguage}/${selectedLanguage}_full.txt`);
        if (!response.ok) {
          throw new Error(`Failed to load word list for ${selectedLanguage}`);
        }
        const text = await response.text();
        const words: Word[] = text.split('\n').map((line) => {
          const [text, tier, definition] = line.split('\t');
          return { text, tier: Number(tier), status: 'learning', definition: definition || '' };
        });
        setWordLists((prev) => ({ ...prev, [selectedLanguage]: words }));
      } catch (error) {
        console.error(error);
        setWordLists((prev) => ({ ...prev, [selectedLanguage]: [] }));
      }
    };
    loadWordList();
  }, [selectedLanguage]);
  const [fontSize, setFontSize] = useState<number>(() => {
    const savedFontSize = localStorage.getItem('fontSize');
    return savedFontSize ? Number(savedFontSize) : 16;
  });
  const [theme, setTheme] = useState<string>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme : 'light';
  });

  useEffect(() => {
    localStorage.setItem('vocabulary', JSON.stringify(vocabulary));
  }, [vocabulary]);

  useEffect(() => {
    localStorage.setItem('fontSize', String(fontSize));
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  const handleBookUpload = (uploadedBook: Book) => {
    setBooks((prev) => [...prev, uploadedBook]);
    setCurrentBookId(uploadedBook.id);
  };

  const handleWordSelect = (wordText: string) => {
    const cleanedWordText = wordText.replace(/[.,\/#!$%^&*;:{}=\-_`~()]/g, "");
    if (!cleanedWordText) return;

    const wordFromList = wordLists[selectedLanguage]?.find(w => w.text === cleanedWordText);

    const word: Word = {
      text: cleanedWordText,
      status: 'learning',
      tier: wordFromList?.tier || 0,
      definition: wordFromList?.definition || 'No definition found.',
    };

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
                    w.text === word.text ? { ...w, definition: word.definition, tier: word.tier } : w,
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

  const handleRemoveWord = (wordToRemove: Word) => {
    setVocabulary((prev) => {
      const langVocab = prev[selectedLanguage] || [];
      return {
        ...prev,
        [selectedLanguage]: langVocab.filter(
          (w) => w.text !== wordToRemove.text
        ),
      };
    });
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  const handleCloseModal = () => {
    setSelectedWord(null);
  };

  const handleFontSizeChange = (size: number) => {
    setFontSize(size);
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  return (
    <div className={`App ${theme}`}>
      <Layout
        header={
          <header className="App-header">
            <h1>Language Reactor</h1>
            <LanguageSelector onLanguageChange={handleLanguageChange} />
          </header>
        }
        mainContent={
          currentBookId === null ? (
            <BookLibrary
              books={books}
              onBookUpload={handleBookUpload}
              onBookSelect={setCurrentBookId}
            />
          ) : (
            <ReadingView
              book={books.find((b) => b.id === currentBookId) || null}
              onWordUpdate={handleWordSelect}
              fontSize={fontSize}
              vocabulary={vocabulary[selectedLanguage] || []}
            />
          )
        }
        sidebar={
          <>
            <ReadingSettings
              fontSize={fontSize}
              theme={theme}
              onFontSizeChange={handleFontSizeChange}
              onThemeChange={handleThemeChange}
            />
            <VocabularyList
              vocabulary={vocabulary[selectedLanguage] || []}
              onRemoveWord={handleRemoveWord}
            />
          </>
        }
      />
      <WordDefinitionModal
        word={selectedWord}
        onClose={handleCloseModal}
        onMarkAsKnown={handleMarkAsKnown}
      />
    </div>
  );
};

export default App;
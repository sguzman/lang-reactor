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
  const [currentPage, setCurrentPage] = useState(0);
  const linesPerPage = 30; // Number of lines to display per page

  useEffect(() => {
    // Reset to first page when a new book is loaded
    setCurrentPage(0);
  }, [currentBookId]);

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

    setVocabulary((prev) => {
      const langVocab = prev[selectedLanguage] || [];
      const existingWordIndex = langVocab.findIndex((w) => w.text === cleanedWordText);

      if (existingWordIndex !== -1) {
        const updatedWord = { ...langVocab[existingWordIndex] };
        if (updatedWord.status === 'learning') {
          updatedWord.status = 'known';
        } else if (updatedWord.status === 'known') {
          // If already known, do nothing
          return prev;
        }
        const newLangVocab = [...langVocab];
        newLangVocab[existingWordIndex] = updatedWord;
        return { ...prev, [selectedLanguage]: newLangVocab };
      } else {
        // Add new word as 'learning'
        const wordFromList = wordLists[selectedLanguage]?.find(w => w.text === cleanedWordText);
        const newWord: Word = {
          text: cleanedWordText,
          status: 'learning',
          tier: wordFromList?.tier || 0,
          definition: wordFromList?.definition || 'No definition found.',
        };
        return { ...prev, [selectedLanguage]: [...langVocab, newWord] };
      }
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

  const handleExportVocabulary = () => {
    const dataStr = JSON.stringify(vocabulary, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vocabulary.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDeleteAllData = () => {
    if (window.confirm('Are you sure you want to delete all data? This action cannot be undone.')) {
      localStorage.clear();
      window.location.reload();
    }
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
              currentPage={currentPage}
              linesPerPage={linesPerPage}
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
        onExportVocabulary={handleExportVocabulary}
        onDeleteAllData={handleDeleteAllData}
        currentPage={currentPage}
        totalPages={Math.ceil((books.find((b) => b.id === currentBookId)?.content || '').split('\n').length / linesPerPage)}
        onPreviousPage={() => setCurrentPage(prev => Math.max(0, prev - 1))}
        onNextPage={() => setCurrentPage(prev => Math.min(Math.ceil((books.find((b) => b.id === currentBookId)?.content || '').split('\n').length / linesPerPage) - 1, prev + 1))}
      />
      
    </div>
  );
};

export default App;
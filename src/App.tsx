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

const DEFAULT_LANGUAGE_COLOR = { light: { background: '#CCCCCC', text: '#333333' }, dark: { background: '#666666', text: '#FFFFFF' } };

const LANGUAGE_COLORS: { [key: string]: { light: { background: string; text: string }; dark: { background: string; text: string } } } = {
  en: { light: { background: '#E8F5E9', text: '#2E7D32' }, dark: { background: '#388E3C', text: '#FFFFFF' } }, // Green
  es: { light: { background: '#E3F2FD', text: '#1976D2' }, dark: { background: '#1565C0', text: '#FFFFFF' } }, // Blue
  fr: { light: { background: '#FFEBEE', text: '#D32F2F' }, dark: { background: '#C62828', text: '#FFFFFF' } }, // Red
  de: { light: { background: '#FFF8E1', text: '#FFB300' }, dark: { background: '#FFA000', text: '#000000' } }, // Amber
  it: { light: { background: '#F3E5F5', text: '#7B1FA2' }, dark: { background: '#6A1B9A', text: '#FFFFFF' } }, // Purple
  pt: { light: { background: '#FFF3E0', text: '#F57C00' }, dark: { background: '#EF6C00', text: '#FFFFFF' } }, // Orange
  ru: { light: { background: '#ECEFF1', text: '#455A64' }, dark: { background: '#37474F', text: '#FFFFFF' } }, // Blue Grey
  zh: { light: { background: '#EFEBE9', text: '#5D4037' }, dark: { background: '#4E342E', text: '#FFFFFF' } }, // Brown
  ja: { light: { background: '#FCE4EC', text: '#C2185B' }, dark: { background: '#AD1457', text: '#FFFFFF' } }, // Pink
  ko: { light: { background: '#E0F7FA', text: '#00838F' }, dark: { background: '#006064', text: '#FFFFFF' } }, // Cyan
  af: { light: { background: '#F1F8E9', text: '#558B2F' }, dark: { background: '#33691E', text: '#FFFFFF' } }, // Light Green
  ar: { light: { background: '#F9FBE7', text: '#9E9D24' }, dark: { background: '#827717', text: '#000000' } }, // Lime
  bg: { light: { background: '#FFFDE7', text: '#FBC02D' }, dark: { background: '#F9A825', text: '#000000' } }, // Yellow
  bn: { light: { background: '#E1F5FE', text: '#0288D1' }, dark: { background: '#01579B', text: '#FFFFFF' } }, // Light Blue
  br: { light: { background: '#EFEBE9', text: '#5D4037' }, dark: { background: '#4E342E', text: '#FFFFFF' } }, // Brown
  bs: { light: { background: '#EDE7F6', text: '#512DA8' }, dark: { background: '#4527A0', text: '#FFFFFF' } }, // Deep Purple
  ca: { light: { background: '#FBE9E7', text: '#E64A19' }, dark: { background: '#D84315', text: '#FFFFFF' } }, // Deep Orange
  cs: { light: { background: '#EFEBE9', text: '#5D4037' }, dark: { background: '#4E342E', text: '#FFFFFF' } }, // Brown
  da: { light: { background: '#ECEFF1', text: '#455A64' }, dark: { background: '#37474F', text: '#FFFFFF' } }, // Blue Grey
  el: { light: { background: '#E8F5E9', text: '#2E7D32' }, dark: { background: '#388E3C', text: '#FFFFFF' } }, // Green
  eo: { light: { background: '#E3F2FD', text: '#1976D2' }, dark: { background: '#1565C0', text: '#FFFFFF' } }, // Blue
  et: { light: { background: '#FFEBEE', text: '#D32F2F' }, dark: { background: '#C62828', text: '#FFFFFF' } }, // Red
  eu: { light: { background: '#FFF8E1', text: '#FFB300' }, dark: { background: '#FFA000', text: '#000000' } }, // Amber
  fa: { light: { background: '#F3E5F5', text: '#7B1FA2' }, dark: { background: '#6A1B9A', text: '#FFFFFF' } }, // Purple
  fi: { light: { background: '#FFF3E0', text: '#F57C00' }, dark: { background: '#EF6C00', text: '#FFFFFF' } }, // Orange
  gl: { light: { background: '#ECEFF1', text: '#455A64' }, dark: { background: '#37474F', text: '#FFFFFF' } }, // Blue Grey
  he: { light: { background: '#EFEBE9', text: '#5D4037' }, dark: { background: '#4E342E', text: '#FFFFFF' } }, // Brown
  hi: { light: { background: '#FCE4EC', text: '#C2185B' }, dark: { background: '#AD1457', text: '#FFFFFF' } }, // Pink
  hr: { light: { background: '#E0F7FA', text: '#00838F' }, dark: { background: '#006064', text: '#FFFFFF' } }, // Cyan
  hu: { light: { background: '#F1F8E9', text: '#558B2F' }, dark: { background: '#33691E', text: '#FFFFFF' } }, // Light Green
  hy: { light: { background: '#F9FBE7', text: '#9E9D24' }, dark: { background: '#827717', text: '#000000' } }, // Lime
  id: { light: { background: '#FFFDE7', text: '#FBC02D' }, dark: { background: '#F9A825', text: '#000000' } }, // Yellow
  is: { light: { background: '#E1F5FE', text: '#0288D1' }, dark: { background: '#01579B', text: '#FFFFFF' } }, // Light Blue
  kk: { light: { background: '#EFEBE9', text: '#5D4037' }, dark: { background: '#4E342E', text: '#FFFFFF' } }, // Brown
  lt: { light: { background: '#EDE7F6', text: '#512DA8' }, dark: { background: '#4527A0', text: '#FFFFFF' } }, // Deep Purple
  lv: { light: { background: '#FBE9E7', text: '#E64A19' }, dark: { background: '#D84315', text: '#FFFFFF' } }, // Deep Orange
  mk: { light: { background: '#EFEBE9', text: '#5D4037' }, dark: { background: '#4E342E', text: '#FFFFFF' } }, // Brown
  ml: { light: { background: '#ECEFF1', text: '#455A64' }, dark: { background: '#37474F', text: '#FFFFFF' } }, // Blue Grey
  ms: { light: { background: '#E8F5E9', text: '#2E7D32' }, dark: { background: '#388E3C', text: '#FFFFFF' } }, // Green
  nl: { light: { background: '#E3F2FD', text: '#1976D2' }, dark: { background: '#1565C0', text: '#FFFFFF' } }, // Blue
  no: { light: { background: '#FFEBEE', text: '#D32F2F' }, dark: { background: '#C62828', text: '#FFFFFF' } }, // Red
  pl: { light: { background: '#FFF8E1', text: '#FFB300' }, dark: { background: '#FFA000', text: '#000000' } }, // Amber
  ro: { light: { background: '#F3E5F5', text: '#7B1FA2' }, dark: { background: '#6A1B9A', text: '#FFFFFF' } }, // Purple
  si: { light: { background: '#FFF3E0', text: '#F57C00' }, dark: { background: '#EF6C00', text: '#FFFFFF' } }, // Orange
  sk: { light: { background: '#ECEFF1', text: '#455A64' }, dark: { background: '#37474F', text: '#FFFFFF' } }, // Blue Grey
  sl: { light: { background: '#EFEBE9', text: '#5D4037' }, dark: { background: '#4E342E', text: '#FFFFFF' } }, // Brown
  sq: { light: { background: '#FCE4EC', text: '#C2185B' }, dark: { background: '#AD1457', text: '#FFFFFF' } }, // Pink
  sr: { light: { background: '#E0F7FA', text: '#00838F' }, dark: { background: '#006064', text: '#FFFFFF' } }, // Cyan
  sv: { light: { background: '#F1F8E9', text: '#558B2F' }, dark: { background: '#33691E', text: '#FFFFFF' } }, // Light Green
  ta: { light: { background: '#F9FBE7', text: '#9E9D24' }, dark: { background: '#827717', text: '#000000' } }, // Lime
  te: { light: { background: '#FFFDE7', text: '#FBC02D' }, dark: { background: '#F9A825', text: '#000000' } }, // Yellow
  th: { light: { background: '#E1F5FE', text: '#0288D1' }, dark: { background: '#01579B', text: '#FFFFFF' } }, // Light Blue
  tl: { light: { background: '#EFEBE9', text: '#5D4037' }, dark: { background: '#4E342E', text: '#FFFFFF' } }, // Brown
  tr: { light: { background: '#EDE7F6', text: '#512DA8' }, dark: { background: '#4527A0', text: '#FFFFFF' } }, // Deep Purple
  uk: { light: { background: '#FBE9E7', text: '#E64A19' }, dark: { background: '#D84315', text: '#FFFFFF' } }, // Deep Orange
  ur: { light: { background: '#EFEBE9', text: '#5D4037' }, dark: { background: '#4E342E', text: '#FFFFFF' } }, // Brown
  vi: { light: { background: '#ECEFF1', text: '#455A64' }, dark: { background: '#37474F', text: '#FFFFFF' } }, // Blue Grey
  ze_en: { light: { background: '#E8F5E9', text: '#2E7D32' }, dark: { background: '#388E3C', text: '#FFFFFF' } }, // Green (Simplified English)
  ze_zh: { light: { background: '#E3F2FD', text: '#1976D2' }, dark: { background: '#1565C0', text: '#FFFFFF' } }, // Blue (Simplified Chinese)
  zh_cn: { light: { background: '#FFEBEE', text: '#D32F2F' }, dark: { background: '#C62828', text: '#FFFFFF' } }, // Red (Chinese China)
  zh_tw: { light: { background: '#FFF8E1', text: '#FFB300' }, dark: { background: '#FFA000', text: '#000000' } }, // Amber (Chinese Taiwan)
};

const App = () => {
  const [books, setBooks] = useState<Book[]>(() => {
    const savedBooks = localStorage.getItem('books');
    return savedBooks ? JSON.parse(savedBooks) : [];
  });
  const [currentBookId, setCurrentBookId] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [vocabulary, setVocabulary] = useState<Vocabulary>(() => {
    const savedVocabulary = localStorage.getItem('vocabulary');
    const initialVocabulary = savedVocabulary ? JSON.parse(savedVocabulary) : {};
    // Ensure that the vocabulary for the initial selected language exists
    if (!initialVocabulary[selectedLanguage]) {
      initialVocabulary[selectedLanguage] = [];
    }
    return initialVocabulary;
  });
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
      const currentLangVocab = prev[selectedLanguage] || [];
      const existingWordIndex = currentLangVocab.findIndex((w) => w.text === cleanedWordText);

      if (existingWordIndex !== -1) {
        const updatedWord = { ...currentLangVocab[existingWordIndex] };
        if (updatedWord.status === 'learning') {
          updatedWord.status = 'known';
        } else if (updatedWord.status === 'known') {
          // If already known, do nothing
          return prev;
        }
        const newLangVocab = [...currentLangVocab];
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
        return { ...prev, [selectedLanguage]: [...currentLangVocab, newWord] };
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
              languageColor={LANGUAGE_COLORS[selectedLanguage]}
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
              languageColor={LANGUAGE_COLORS[selectedLanguage]}
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
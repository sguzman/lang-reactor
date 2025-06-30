
import React from 'react';

interface Props {
  onLanguageChange: (language: string) => void;
}

const LanguageSelector: React.FC<Props> = ({ onLanguageChange }) => {
  const languages = ['en', 'es', 'fr', 'de']; // Example languages

  return (
    <div>
      <label htmlFor="language-select">Learning Language: </label>
      <select id="language-select" onChange={(e) => onLanguageChange(e.target.value)}>
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {lang.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;

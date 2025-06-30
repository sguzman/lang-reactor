
import React from 'react';

interface Props {
  onLanguageChange: (language: string) => void;
}

const LanguageSelector: React.FC<Props> = ({ onLanguageChange }) => {
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
  ];

  return (
    <div>
      <label htmlFor="language-select">Learning Language: </label>
      <select id="language-select" onChange={(e) => onLanguageChange(e.target.value)}>
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;

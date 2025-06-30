
import React from 'react';

interface Props {
  onLanguageChange: (language: string) => void;
}

const LanguageSelector: React.FC<Props> = ({ onLanguageChange }) => {
  const languages = [
    { code: 'af', name: 'Afrikaans' },
    { code: 'ar', name: 'Arabic' },
    { code: 'bg', name: 'Bulgarian' },
    { code: 'bn', name: 'Bengali' },
    { code: 'br', name: 'Breton' },
    { code: 'bs', name: 'Bosnian' },
    { code: 'ca', name: 'Catalan' },
    { code: 'cs', name: 'Czech' },
    { code: 'da', name: 'Danish' },
    { code: 'de', name: 'German' },
    { code: 'el', name: 'Greek' },
    { code: 'en', name: 'English' },
    { code: 'eo', name: 'Esperanto' },
    { code: 'es', name: 'Spanish' },
    { code: 'et', name: 'Estonian' },
    { code: 'eu', name: 'Basque' },
    { code: 'fa', name: 'Persian' },
    { code: 'fi', name: 'Finnish' },
    { code: 'fr', name: 'French' },
    { code: 'gl', name: 'Galician' },
    { code: 'he', name: 'Hebrew' },
    { code: 'hi', name: 'Hindi' },
    { code: 'hr', name: 'Croatian' },
    { code: 'hu', name: 'Hungarian' },
    { code: 'hy', name: 'Armenian' },
    { code: 'id', name: 'Indonesian' },
    { code: 'is', name: 'Icelandic' },
    { code: 'it', name: 'Italian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ka', name: 'Georgian' },
    { code: 'kk', name: 'Kazakh' },
    { code: 'ko', name: 'Korean' },
    { code: 'lt', name: 'Lithuanian' },
    { code: 'lv', name: 'Latvian' },
    { code: 'mk', name: 'Macedonian' },
    { code: 'ml', name: 'Malayalam' },
    { code: 'ms', name: 'Malay' },
    { code: 'nl', name: 'Dutch' },
    { code: 'no', name: 'Norwegian' },
    { code: 'pl', name: 'Polish' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'pt_br', name: 'Portuguese (Brazil)' },
    { code: 'ro', name: 'Romanian' },
    { code: 'ru', name: 'Russian' },
    { code: 'si', name: 'Sinhala' },
    { code: 'sk', name: 'Slovak' },
    { code: 'sl', name: 'Slovenian' },
    { code: 'sq', name: 'Albanian' },
    { code: 'sr', name: 'Serbian' },
    { code: 'sv', name: 'Swedish' },
    { code: 'ta', name: 'Tamil' },
    { code: 'te', name: 'Telugu' },
    { code: 'th', name: 'Thai' },
    { code: 'tl', name: 'Tagalog' },
    { code: 'tr', name: 'Turkish' },
    { code: 'uk', name: 'Ukrainian' },
    { code: 'ur', name: 'Urdu' },
    { code: 'vi', name: 'Vietnamese' },
    { code: 'ze_en', name: 'English (Simplified)' },
    { code: 'ze_zh', name: 'Chinese (Simplified)' },
    { code: 'zh_cn', name: 'Chinese (China)' },
    { code: 'zh_tw', name: 'Chinese (Taiwan)' },
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

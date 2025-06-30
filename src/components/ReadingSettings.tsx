
import React from 'react';

interface Props {
  fontSize: number;
  theme: string;
  onFontSizeChange: (size: number) => void;
  onThemeChange: (theme: string) => void;
}

const ReadingSettings: React.FC<Props> = ({ fontSize, theme, onFontSizeChange, onThemeChange }) => {
  return (
    <div className="reading-settings">
      <h3>Reading Settings</h3>
      <div>
        <label htmlFor="font-size">Font Size: </label>
        <input
          type="range"
          id="font-size"
          min="12"
          max="24"
          value={fontSize}
          onChange={(e) => onFontSizeChange(Number(e.target.value))}
        />
        <span>{fontSize}px</span>
      </div>
      <div>
        <label htmlFor="theme-select">Theme: </label>
        <select id="theme-select" value={theme} onChange={(e) => onThemeChange(e.target.value)}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
    </div>
  );
};

export default ReadingSettings;

// src/components/LanguageSwitcher.jsx
import React from 'react';
import { useTranslation } from '../context/TranslationContext';

function LanguageSwitcher() {
  const { currentLanguage, changeLanguage, supportedLanguages } = useTranslation();
  
  return (
    <select 
      value={currentLanguage}
      onChange={(e) => changeLanguage(e.target.value)}
      className="form-select"
      style={{ width: 'auto', maxWidth: '150px' }}
    >
      {Object.entries(supportedLanguages).map(([code, name]) => (
        <option key={code} value={code}>
          {name}
        </option>
      ))}
    </select>
  );
}

export default LanguageSwitcher;
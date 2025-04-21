// src/components/TranslationIndicator.jsx
import React from 'react';
import { useTranslation } from '../context/TranslationContext';

/**
 * A subtle indicator component that shows when translations are in progress
 * Can be placed in the app header or footer
 */
const TranslationIndicator = ({ className = '', showText = true }) => {
  const { isLoading, currentLanguage, supportedLanguages } = useTranslation();
  
  if (!isLoading) return null;
  
  return (
    <div className={`translation-indicator d-flex align-items-center ${className}`}>
      <div className="spinner-border spinner-border-sm text-primary me-2" 
           role="status" style={{ width: '16px', height: '16px' }}>
        <span className="visually-hidden">Translating...</span>
      </div>
      {showText && (
        <small className="text-muted">
          Translating to {supportedLanguages[currentLanguage]}...
        </small>
      )}
    </div>
  );
};

export default TranslationIndicator;
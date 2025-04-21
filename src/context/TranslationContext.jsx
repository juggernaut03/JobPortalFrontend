// src/context/TranslationContext.jsx
import React, { createContext, useState, useContext } from 'react';
import { translateTextWithAPI } from '../services/translationService';


// Create a context
const TranslationContext = createContext();

// Basic supported languages
export const SUPPORTED_LANGUAGES = {
  english: 'English',
  hindi: 'हिन्दी',
  tamil: 'தமிழ்',
  telugu: 'తెలుగు',
  kannada: 'ಕನ್ನಡ',
  malayalam: 'മലയാളം',
  marathi: 'मराठी',
  // Add more as needed
};

// Simplified translation provider
export const TranslationProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('english');
  const [translations, setTranslations] = useState({});

  // Load saved language preference on mount
  React.useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && SUPPORTED_LANGUAGES[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  // Save language preference when it changes
  React.useEffect(() => {
    localStorage.setItem('preferredLanguage', currentLanguage);
  }, [currentLanguage]);

  // Change language function
  const changeLanguage = (language) => {
    if (SUPPORTED_LANGUAGES[language]) {
      setCurrentLanguage(language);
    }
  };

  // Simple translate function that returns original text for English
  // and stored translations or original text for other languages
  // src/context/TranslationContext.jsx
// Add this import at the top:


// Then modify the translate function in the TranslationProvider:
const translate = async (text, targetLanguage = currentLanguage) => {
  if (targetLanguage === 'english' || !text) {
    return text;
  }

  const key = `${text}_${targetLanguage}`;
  
  // If we already have a translation, use it
  if (translations[key]) {
    return translations[key];
  }
  
  try {
    // Get translation from API
    const translatedText = await translateTextWithAPI(text, targetLanguage);
    
    // Save translation to state if different from original
    if (translatedText && translatedText !== text) {
      updateTranslation(text, targetLanguage, translatedText);
    }
    
    return translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    return text;
  }
};
  // Function to update translations (to be used later with API)
  const updateTranslation = (text, language, translatedText) => {
    const key = `${text}_${language}`;
    setTranslations(prev => ({
      ...prev,
      [key]: translatedText
    }));
  };

  return (
    <TranslationContext.Provider value={{
      currentLanguage,
      changeLanguage,
      translate,
      updateTranslation,
      supportedLanguages: SUPPORTED_LANGUAGES
    }}>
      {children}
    </TranslationContext.Provider>
  );
};

// Custom hook to use the translation context
export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

export default TranslationContext;
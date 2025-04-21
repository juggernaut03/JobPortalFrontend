// src/components/TranslatedText.jsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from '../context/TranslationContext';

function TranslatedText({ text, Component = 'span', className = '', ...props }) {
  const { translate, currentLanguage } = useTranslation();
  const [translatedText, setTranslatedText] = useState(text);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // No need to translate if language is english or text is empty
    if (currentLanguage === 'english' || !text) {
      setTranslatedText(text);
      return;
    }
    
    // Handle async translation
    const getTranslation = async () => {
      setIsLoading(true);
      try {
        const result = await translate(text);
        // Only use the translation if it's not empty
        setTranslatedText(result || text);
      } catch (error) {
        console.error('Failed to translate text:', error);
        setTranslatedText(text); // Fallback to original
      } finally {
        setIsLoading(false);
      }
    };
    
    getTranslation();
  }, [text, currentLanguage, translate]);
  
  return (
    <Component 
      className={`${className} ${isLoading ? 'opacity-70' : ''}`} 
      {...props}
    >
      {translatedText}
    </Component>
  );
}

export default TranslatedText;
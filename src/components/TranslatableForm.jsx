// src/components/TranslatableForm.jsx - Enhanced version
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from '../context/TranslationContext';

/**
 * Enhanced component that translates all form content (labels, placeholders, help text, etc.)
 * with more efficient batch translation and better error handling
 * 
 * @param {Object} props - Component props
 * @param {Object} props.formContent - Content object with keys for all text elements to be translated
 * @param {Function} props.children - Render props function that receives translated content
 * @param {boolean} props.autoTranslate - Whether to automatically translate on mount and language change
 * @param {Function} props.onTranslated - Callback after translation completes
 * @returns {React.ReactElement} - Rendered form with translated content
 */
const TranslatableForm = ({ 
  formContent, 
  children, 
  autoTranslate = true,
  onTranslated = null,
  loadingFallback = null
}) => {
  const { currentLanguage, batchTranslate, isLoading: contextLoading } = useTranslation();
  const [translatedContent, setTranslatedContent] = useState(formContent);
  const [isLoading, setIsLoading] = useState(autoTranslate);
  const [error, setError] = useState(null);
  const [translationPending, setTranslationPending] = useState(autoTranslate);

  // Memoize form content to prevent unnecessary translations
  const memoizedContent = useMemo(() => formContent, [JSON.stringify(formContent)]);
  
  // Translate form content
  const translateFormContent = useCallback(async () => {
    // Skip translation if language is English or no content
    if (currentLanguage === 'english' || !memoizedContent) {
      setTranslatedContent(memoizedContent);
      setTranslationPending(false);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Use batch translation to minimize API calls
      const translated = await batchTranslate(memoizedContent, currentLanguage);
      setTranslatedContent(translated);
      
      // Call onTranslated callback if provided
      if (onTranslated) {
        onTranslated(translated);
      }
    } catch (error) {
      console.error('Form translation error:', error);
      setError(error.message || 'Failed to translate form content');
      // Fallback to original content
      setTranslatedContent(memoizedContent);
    } finally {
      setIsLoading(false);
      setTranslationPending(false);
    }
  }, [memoizedContent, currentLanguage, batchTranslate, onTranslated]);

  // Translate content when language changes
  useEffect(() => {
    if (autoTranslate) {
      setTranslationPending(true);
    }
  }, [currentLanguage, autoTranslate, memoizedContent]);
  
  // Process pending translations
  useEffect(() => {
    if (translationPending) {
      translateFormContent();
    }
  }, [translationPending, translateFormContent]);

  // Manual translation trigger function
  const translate = useCallback(() => {
    setTranslationPending(true);
  }, []);

  // Show loading fallback if provided
  if ((isLoading || contextLoading) && loadingFallback) {
    return loadingFallback;
  }

  // Provide additional metadata to the render function
  return (
    <div className={isLoading ? 'opacity-80' : ''}>
      {children(translatedContent, { 
        isLoading, 
        error, 
        translate, 
        language: currentLanguage 
      })}
    </div>
  );
};

export default TranslatableForm;
// src/services/translationService.js - Improved version with better request handling
import axios from 'axios';

// Cache for storing translations to reduce API calls
const translationCache = new Map();

// Queue for translation requests
const translationQueue = [];
let isProcessingQueue = false;

// Gemini API configuration
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyAGpWWKzH7OOhKKYfw1Pe_9vbDvALf208Q';

/**
 * Process the translation queue one at a time
 */
const processQueue = async () => {
  if (isProcessingQueue || translationQueue.length === 0) return;
  
  isProcessingQueue = true;
  
  try {
    const nextRequest = translationQueue.shift();
    const { text, targetLanguage, resolve, reject } = nextRequest;
    
    try {
      const result = await performTranslation(text, targetLanguage);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  } finally {
    isProcessingQueue = false;
    
    // Process next item in queue if any
    if (translationQueue.length > 0) {
      setTimeout(processQueue, 200); // Small delay between requests
    }
  }
};

/**
 * Actual translation function that calls the API
 */
const performTranslation = async (text, targetLanguage) => {
  if (!API_KEY) {
    console.error('Gemini API key is missing. Check your .env file.');
    return text;
  }
  
  // Be explicit about needing ONLY the translation with no additional text
  const prompt = `Translate this text to ${targetLanguage}. Provide ONLY the translated text with no additional commentary, explanations or formatting: "${text}"`;
  
  // Make API request with retry logic
  let retries = 3;
  let translatedText = text;
  
  while (retries > 0) {
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
          contents: [
            { parts: [{ text: prompt }] }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      // Get just the text content and clean it
      const content = response.data.candidates?.[0]?.content;
      translatedText = content?.parts?.[0]?.text?.trim() || text;
      
      // Remove any quotation marks that might be in the response
      translatedText = translatedText.replace(/^["']|["']$/g, '');
      
      // Remove any explanatory text that might be included
      if (translatedText.includes('\n')) {
        translatedText = translatedText.split('\n')[0];
      }
      
      // Success - break retry loop
      break;
      
    } catch (error) {
      retries--;
      if (error.response?.status === 429) {
        // Rate limit hit - wait longer before retrying
        console.warn('Translation rate limit hit, waiting before retry...');
        await new Promise(resolve => setTimeout(resolve, 1000 * (4 - retries)));
      } else if (retries <= 0) {
        console.error('Translation API error:', error);
        return text;
      } else {
        // Other error, shorter wait
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
  }
  
  return translatedText;
};

/**
 * Main translation function that queues requests and returns from cache if available
 */
export const translateTextWithAPI = async (text, targetLanguage) => {
  if (!text || targetLanguage === 'english') {
    return text;
  }
  
  // Generate cache key
  const cacheKey = `${text}_${targetLanguage}`;
  
  // Check cache first
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }
  
  // Return a promise that will be resolved when the translation is done
  return new Promise((resolve, reject) => {
    // Add to queue
    translationQueue.push({ text, targetLanguage, resolve: (result) => {
      // Store in cache
      translationCache.set(cacheKey, result);
      resolve(result);
    }, reject });
    
    // Start processing queue if not already processing
    processQueue();
  });
};

export default {
  translateTextWithAPI
};
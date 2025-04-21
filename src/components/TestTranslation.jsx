// src/components/TestTranslation.jsx
import React, { useState } from 'react';
import { translateTextWithAPI } from '../services/translationService';

function TestTranslation() {
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiKeyPresent, setApiKeyPresent] = useState(false);

  // Check if API key is available
  React.useEffect(() => {
    const key = import.meta.env.VITE_GEMINI_API_KEY;
    setApiKeyPresent(!!key);
    if (!key) {
      setError('API key is not set. Check your .env file');
    }
  }, []);

  const testTranslation = async () => {
    setLoading(true);
    setError('');
    
    try {
      const translated = await translateTextWithAPI("Hello, this is a test", "hindi");
      setResult(translated);
      console.log("Translation result:", translated);
    } catch (err) {
      console.error("Translation test failed:", err);
      setError(err.message || "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 border">
      <h3>Translation Test</h3>
      
      {error && (
        <div className="alert alert-danger">{error}</div>
      )}
      
      <div className="mb-2">
        <strong>API Key Status:</strong> {apiKeyPresent ? 'Present' : 'Missing'}
      </div>
      
      <button 
        className="btn btn-primary mb-3" 
        onClick={testTranslation}
        disabled={loading || !apiKeyPresent}
      >
        {loading ? "Translating..." : "Test Translation"}
      </button>
      
      {result && (
        <div className="mt-2 p-2 bg-light">
          <strong>Result:</strong> {result}
        </div>
      )}
    </div>
  );
}

export default TestTranslation;
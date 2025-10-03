// Simple migration test page
"use client";

import { useState } from 'react';

export default function MigrationTest() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const runMigration = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      const response = await fetch('/api/migrate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        error: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const checkStatus = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/migrate');
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        error: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🚀 Firebase to JSON Migration Test</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={checkStatus}
          disabled={loading}
          style={{ 
            padding: '10px 20px', 
            marginRight: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Loading...' : 'Check Status'}
        </button>
        
        <button 
          onClick={runMigration}
          disabled={loading}
          style={{ 
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Migrating...' : 'Run Migration'}
        </button>
      </div>

      {result && (
        <div style={{ 
          padding: '15px', 
          backgroundColor: result.success ? '#d4edda' : '#f8d7da',
          border: `1px solid ${result.success ? '#c3e6cb' : '#f5c6cb'}`,
          borderRadius: '5px',
          marginTop: '20px'
        }}>
          <h3>{result.success ? '✅ Success' : '❌ Error'}</h3>
          <pre style={{ whiteSpace: 'pre-wrap' }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
"use client";

import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';

const FirebaseTest = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Test writing to Firestore
  const testWrite = async () => {
    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, 'test'), {
        message: 'Hello from BigLeap Web!',
        timestamp: serverTimestamp(),
        testData: Math.random()
      });
      setMessage(`Document written with ID: ${docRef.id}`);
      testRead(); // Refresh the data
    } catch (error) {
      setMessage(`Error adding document: ${error.message}`);
    }
    setLoading(false);
  };

  // Test reading from Firestore
  const testRead = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'test'));
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() });
      });
      setData(docs);
      setMessage(`Successfully read ${docs.length} documents`);
    } catch (error) {
      setMessage(`Error reading documents: ${error.message}`);
    }
    setLoading(false);
  };

  useEffect(() => {
    testRead();
  }, []);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px', borderRadius: '8px' }}>
      <h3>Firebase Connection Test</h3>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={testWrite} 
          disabled={loading}
          style={{ 
            padding: '10px 20px', 
            marginRight: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Loading...' : 'Test Write to Firebase'}
        </button>
        
        <button 
          onClick={testRead} 
          disabled={loading}
          style={{ 
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Loading...' : 'Test Read from Firebase'}
        </button>
      </div>

      {message && (
        <div style={{ 
          padding: '10px', 
          backgroundColor: message.includes('Error') ? '#f8d7da' : '#d4edda',
          color: message.includes('Error') ? '#721c24' : '#155724',
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          {message}
        </div>
      )}

      <div>
        <h4>Data from Firebase:</h4>
        {data.length === 0 ? (
          <p>No data found</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {data.map((item) => (
              <li key={item.id} style={{ 
                padding: '10px', 
                backgroundColor: '#f8f9fa', 
                margin: '5px 0',
                borderRadius: '4px'
              }}>
                <strong>ID:</strong> {item.id}<br />
                <strong>Message:</strong> {item.message}<br />
                <strong>Test Data:</strong> {item.testData}<br />
                <strong>Timestamp:</strong> {item.timestamp?.toDate?.()?.toString() || 'N/A'}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FirebaseTest;
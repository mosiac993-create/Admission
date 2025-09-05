import React, { useState } from 'react';
import { supabase } from '../supabase/config';

const TestAuth = () => {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('testpass123');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testSignup = async () => {
    setLoading(true);
    setResult('');
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/profile`
        }
      });
      
      if (error) {
        setResult(`Error: ${error.message}`);
      } else {
        setResult(`Success: ${JSON.stringify(data, null, 2)}`);
      }
    } catch (err) {
      setResult(`Exception: ${err.message}`);
    }
    
    setLoading(false);
  };

  const testLogin = async () => {
    setLoading(true);
    setResult('');
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        setResult(`Error: ${error.message}`);
      } else {
        setResult(`Success: ${JSON.stringify(data, null, 2)}`);
      }
    } catch (err) {
      setResult(`Exception: ${err.message}`);
    }
    
    setLoading(false);
  };

  const checkSession = async () => {
    setLoading(true);
    setResult('');
    
    try {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        setResult(`Error: ${error.message}`);
      } else {
        setResult(`Session: ${JSON.stringify(data, null, 2)}`);
      }
    } catch (err) {
      setResult(`Exception: ${err.message}`);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Supabase Auth Test</h1>
        
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={testSignup}
                disabled={loading}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
              >
                Test Signup
              </button>
              
              <button
                onClick={testLogin}
                disabled={loading}
                className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
              >
                Test Login
              </button>
              
              <button
                onClick={checkSession}
                disabled={loading}
                className="px-4 py-2 bg-purple-500 text-white rounded disabled:opacity-50"
              >
                Check Session
              </button>
            </div>
          </div>
        </div>
        
        {result && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Result:</h3>
            <pre className="text-sm overflow-auto">{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestAuth;

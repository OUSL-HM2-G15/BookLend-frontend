import React, { useState } from 'react';
import LoginModal from './components/LoginModal';

export default function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6"> BookLend</h1>

      <button
        onClick={() => setShowLogin(true)}
        className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
      >
        Sign In
      </button>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
} 
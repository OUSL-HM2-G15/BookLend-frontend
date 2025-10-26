import React, { useState } from 'react';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';

// Given variables to control the visibility of the modals with visibility
export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6"> BookLend</h1>

      <button
        onClick={() => setShowLogin(true)} // Shows the login modal when clicked
        className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
      >
        Sign In
      </button>

      {/* LoginModal component with visibility controlled by 'showLogin' state */}
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)}
        onOpenRegister={() => {
          setShowLogin(false); // Close the login modal
          setShowRegister(true);  // Open the register modal
        }}
      />
      {/* RegisterModal component with visibility controlled by 'showRegister' state */}
      <RegisterModal
        isOpen={showRegister} onClose={() => setShowRegister(false)} onOpenLogin={() => {
          setShowRegister(false);   // Close the register modal
          setShowLogin(true);  // Open the login modal
        }}
      />
    </div> 
  );
} 

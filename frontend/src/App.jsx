 feature/borrowed-books-ui
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import LoginModal from "./components/LoginModal";
import RegisterModal from './components/RegisterModal';
import Dashboard from "./pages/Dashboard"
import BorrowedBooks from "./pages/BorrowedBooks"

/**
 * Landing Page — the main homepage with Sign In
 */


// Given variables to control the visibility of the modals with visibility
function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6"> BookLend</h1>

      {/* Sign In Button */}
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
        onLoginSuccess={() => {
          setShowLogin(false);
          navigate("/dashboard"); // redirect after login
        }}
      />
      {/* RegisterModal component with visibility controlled by 'showRegister' state */}
      <RegisterModal
        isOpen={showRegister} onClose={() => setShowRegister(false)} onOpenLogin={() => {
          setShowRegister(false);   // Close the register modal
          setShowLogin(true);  // Open the login modal
        }}
      />
=======
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <h1>Welcome to BookLend Application</h1>
    <Footer />
 feature/borrowed-books-ui
    </div>
  );
}

feature/borrowed-books-ui
/**
 * App with routes
 */

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/borrowed-books" element={<BorrowedBooks />} />
      </Routes>
    </Router>
  );
}

export default App;
feature/borrowed-books-ui

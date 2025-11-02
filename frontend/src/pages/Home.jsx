import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "../components/LoginModal";
import RegisterModal from "../components/RegisterModal";
import PublicHeader from "../components/PublicHeader";
import Footer from "../components/Footer";
import bookIllustration from "../assets/illustration-books.svg"; // adjust path if needed


export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, [navigate]);

  const handleLoginSuccess = () => {
    setShowLogin(false);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <PublicHeader
        onLoginClick={() => setShowLogin(true)}
        onRegisterClick={() => setShowRegister(true)}
      />

{/* Main content */}
<main className="flex-1 flex flex-col md:flex-row items-center justify-between px-6 lg:px-16 py-16 bg-gradient-to-r from-indigo-50 via-white to-indigo-100">
  
  {/* Left Section — Text Content */}
  <div className="max-w-xl text-left space-y-6">
    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
      Welcome to <span className="text-indigo-600">BookLend</span>
    </h1>
    <p className="text-lg sm:text-xl text-gray-700">
      A smart platform to borrow, lend, and manage your books seamlessly.
      Discover new reads, connect with fellow book lovers, and organize your bookshelf effortlessly.
    </p>
    <div className="flex gap-4">
      <button
        onClick={() => setShowLogin(true)}
        className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition font-medium"
      >
        Sign In
      </button>
    </div>
  </div>

  {/* Right Section — Simple Illustration or Decorative Element */}
  <div className="hidden md:flex justify-center items-center">
    <img
      src={bookIllustration} 
      alt="Books Illustration"
      className="w-80 sm:w-96 lg:w-[500px] h-auto drop-shadow-lg"
    />
  </div>
</main>


      {/* Login Modal */}
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onOpenRegister={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Register Modal */}
      <RegisterModal
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
        onOpenLogin={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

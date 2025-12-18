import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoginModal from "../components/LoginModal";
import RegisterModal from "../components/RegisterModal";
import PublicHeader from "../components/PublicHeader";
import Footer from "../components/Footer";
import bookIllustration from "../assets/illustration-books.svg"; // adjust path if needed
import ForgotPasswordModal from "../components/ForgotPasswordModel";
import ResetPasswordModal from "../components/ResetPasswordModal";


export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [isForgotOpen, setForgotOpen] = useState(false);
  const [isResetOpen, setResetOpen] = useState(false);
  const [resetToken, setResetToken] = useState('');

  const openLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
    navigate("/login");
  };

  const openRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
    navigate("/register");
  };

  const closeAuth = () => {
    setShowLogin(false);
    setShowRegister(false);
    navigate("/");
  };

  useEffect(() => {
    if (location.pathname === "/login") {
      setShowLogin(true);
      setShowRegister(false);
    }

    if (location.pathname === "/register") {
      setShowRegister(true);
      setShowLogin(false);
    }
  }, [location.pathname]);

  // REDIRECT IF LOGGED IN
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, [navigate]);

  const handleLoginSuccess = () => {
    // setShowLogin(false);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <PublicHeader
        onLoginClick={openLogin}
        onRegisterClick={openRegister}
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
              onClick={openLogin}
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
        onClose={closeAuth}
        onOpenRegister={openRegister}
        onLoginSuccess={handleLoginSuccess}
        onOpenForgot={() => setForgotOpen(true)}
        
      />

      {/* Register Modal */}
      <RegisterModal
        isOpen={showRegister}
        onClose={closeAuth}
        onOpenLogin={openLogin}
      />
      <ForgotPasswordModal
        isOpen={isForgotOpen}
        onClose={() => setForgotOpen(false)}
        onOpenReset={(token) => {
          setResetToken(token);
          setResetOpen(true);
        }}
      />

      <ResetPasswordModal
        isOpen={isResetOpen}
        onClose={() => setResetOpen(false)}
        token={resetToken}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

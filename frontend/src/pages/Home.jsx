import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoginModal from "../components/LoginModal";
import RegisterModal from "../components/RegisterModal";
import PublicHeader from "../components/PublicHeader";
import Footer from "../components/Footer";
import PublicExplore from "../components/PublicExplore";
import ForgotPasswordModal from "../components/ForgotPasswordModel";
import ResetPasswordModal from "../components/ResetPasswordModal";
import BookDetailPopUp from "../components/PublicBookDetail";


export default function Home({ onLoginSuccess }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [isForgotOpen, setForgotOpen] = useState(false);
  const [isResetOpen, setResetOpen] = useState(false);
  const [resetToken, setResetToken] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);

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

  const handleLoginSuccess = async () => {
    await onLoginSuccess(); // fetch user
    navigate("/dashboard", {replace: true });
  };

  const handleLoginRequired = () => {
    openLogin(); // open login modal
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <PublicHeader
        onLoginClick={openLogin}
        onRegisterClick={openRegister}
      />

      {/* Main content */}
        <section className="pt-20 px-6 lg:px-16 pb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-indigo-600 text-center">
            👋 Hello, Book Lover! Find Something New
          </h2>
          <PublicExplore
            isPublic={true}
            onLoginRequired={() => setShowLogin(true)}
            onOpenDetail={(book) => setSelectedBook(book)} // open BookDetailPopUp
          />
        </section>

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

      {selectedBook && (
        <BookDetailPopUp
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}

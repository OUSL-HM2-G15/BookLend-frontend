import React, { useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
//import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/DashboardSideBar";
import AddBook from "../components/AddBook";

import { Outlet } from "react-router-dom";

import LoginModal from "../components/LoginModal";

export default function DashboardLayout({ user, onLogout  }) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAddBook, setShowAddBook] = useState(false);

 // Called after logout confirmation
  const handleLogout = () => {
    if (onLogout) onLogout(); // clear auth/token
    setShowLoginModal(true); // open login modal
  };


  return (
    <div className="bg-white min-h-screen">
      {/* Fixed Header */}
      <DashboardHeader user={user} onLogout={handleLogout} setShowAddBook={setShowAddBook} />

      {/* Add Book Popup Modal */}
      {showAddBook && (
        <AddBook 
          open={showAddBook}
          onClose={() => setShowAddBook(false)}
        />
      )}

      {/* Page Layout */}
      <div className="flex flex-1">
        {/* Fixed Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 ml-64 mt-16 p-6 overflow-y-auto">
          <Outlet context={{ user }} />
        </main>
      </div>
      {/* Footer */}
      <Footer />

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={() => setShowLoginModal(false)}
        onOpenRegister={() => {}}
        onOpenForgot={() => {}}
      />
    </div>
  );
}

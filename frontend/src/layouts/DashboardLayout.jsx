import React, { useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import Footer from "../components/Footer";
import Sidebar from "../components/DashboardSideBar";
import AddBook from "../components/AddBook";
import { Outlet ,useLocation } from "react-router-dom";
import LoginModal from "../components/LoginModal";

export default function DashboardLayout({ user, onLogout  }) {
  const [showAddBook, setShowAddBook] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const location = useLocation();

  // Called after logout confirmation
  const handleLogout = () => {
    if (onLogout) onLogout();   // call global App logout
    setShowLoginModal(true);    // Optional: open login modal
  };
    // Hide sidebar on book detail pages
    const shouldHideSidebar =
   location.pathname.startsWith("/books/") ||
   (location.pathname.startsWith("/my-books/") && location.pathname !== "/my-books");
    
  return (
    <div className="bg-white min-h-screen">
      {/* Fixed Header */}
      <DashboardHeader user={user} onLogout={handleLogout} setShowAddBook={setShowAddBook} />

      {/* Add Book Popup Modal */}
      {showAddBook && (
        <AddBook 
        // props to control modal visibility from parent
          open={showAddBook}
          onClose={() => setShowAddBook(false)}
          onSuccess={() => setShowAddBook(false)}
        />
      )}

      {/* Page Layout */}
      <div className="flex flex-1">
        {/* Fixed Sidebar */}
        {!shouldHideSidebar && <Sidebar />}

        {/* Main Content Area */}

        <main 
          className={`flex-1 mt-16 p-6 h-[calc(100vh-4rem)] overflow-y-auto
            ${shouldHideSidebar ? "ml-0" : "ml-64"}
          `}
          >
          <Outlet context={{ user }} /> 
          {/* Pass user down to child routes via Outlet context */}
        </main>
      </div>
      {/* Footer */}
      <Footer />

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

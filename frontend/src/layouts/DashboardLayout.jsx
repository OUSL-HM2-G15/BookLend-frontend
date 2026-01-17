import React, { useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import Sidebar from "../components/DashboardSideBar";
import AddBook from "../components/AddBook";
import { Outlet, useLocation } from "react-router-dom";
import LoginModal from "../components/LoginModal";

export default function DashboardLayout({ user, onLogout }) {
  const [showAddBook, setShowAddBook] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    if (onLogout) onLogout();
    setShowLoginModal(true); // Optional: open login modal
  };

  const shouldHideSidebar =
    location.pathname.startsWith("/dashboard/explore/") ||
    location.pathname.startsWith("/dashboard/my-books/") ||
    location.pathname.startsWith("/dashboard/my-borrowed-books/");

  return (
    <div className="bg-white min-h-screen">
      {/* Fixed Header */}
      <DashboardHeader user={user} onLogout={handleLogout} setShowAddBook={setShowAddBook} />

      {/* Add Book Popup Modal */}
      {showAddBook && (
        <AddBook
          open={showAddBook}
          onClose={() => setShowAddBook(false)}
          onSuccess={() => setShowAddBook(false)}
        />
      )}

      {/* Page Layout */}
      <div className="flex">
        {/* Fixed Sidebar */}
        {!shouldHideSidebar && <Sidebar />}

        {/* Main Content Area */}
        <main className={`flex-1 mt-16 p-6 h-[calc(100vh-4rem)] overflow-y-auto ${shouldHideSidebar ? "ml-0" : "ml-64"}`}>
          <Outlet context={{ user }} />
        </main>
      </div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={() => setShowLoginModal(false)}
        onOpenRegister={() => { }}
        onOpenForgot={() => { }}
      />
    </div>
  );
}

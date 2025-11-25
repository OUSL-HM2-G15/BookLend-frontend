import React, { useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/DashboardSideBar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout({ user, children }) {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLogout = () => setShowLoginModal(true);
  return (
    <div className="flex flex-col min-h-scree0 bg-gray-50n">
      {/* Dashboard Header */}
      <DashboardHeader user={user} />

      {/* Public Header (if needed) */}
      <Header onLogout={handleLogout} />

      {/* Page Layout */}
      <div className="flex flex-1">
        {/* Fixed Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 ml-64 mt-16 p-6 overflow-y-auto">
          {/* Nested routes or children */}
          {children || <Outlet context={{ user }} />}
        </main>
      </div>
      {/* Footer */}
      <Footer />

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          {/* LoginModal component goes here */}
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/DashboardSideBar";

const DashboardLayout = ({ children }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLogout = () => {
    setShowLoginModal(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header onLogout={handleLogout} />

      {/* Main area: sidebar + content */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r flex flex-col min-h-0">
          <Sidebar />
        </div>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto min-h-0">
          {children}
        </main>
      </div>

      {/* Footer */}
      <Footer />

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          {/* Render the LoginModal here */}
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
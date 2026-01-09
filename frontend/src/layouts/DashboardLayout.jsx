import React, { useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import Sidebar from "../components/DashboardSideBar";
import AddBook from "../components/AddBook";
import { useLocation } from "react-router-dom";

import { Outlet } from "react-router-dom";

export default function DashboardLayout({ user }) {
    const [showAddBook, setShowAddBook] = useState(false);
    const location = useLocation();

    const shouldHideSidebar =
    location.pathname.startsWith("/books/") ||
    location.pathname.startsWith("/my-books/");
    
  return (
    <div className="bg-white min-h-screen">
      {/* Fixed Header */}
      <DashboardHeader user={user} setShowAddBook={setShowAddBook} />

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
      <div className="flex">
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
    </div>
  );
}

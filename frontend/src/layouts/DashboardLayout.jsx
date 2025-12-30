import React, { useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import Sidebar from "../components/DashboardSideBar";
import AddBook from "../components/AddBook";

import { Outlet } from "react-router-dom";

export default function DashboardLayout({ user }) {
    const [showAddBook, setShowAddBook] = useState(false);

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
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 ml-64 mt-16 p-6 h-[calc(100vh-4rem)] overflow-y-auto">
          <Outlet context={{ user }} /> 
          {/* Pass user down to child routes via Outlet context */}
        </main>
      </div>
    </div>
  );
}

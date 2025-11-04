import React from "react";
import DashboardHeader from "../components/DashboardHeader";
import Sidebar from "../components/DashboardSideBar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout({ user }) {
  return (
    <div className="bg-white min-h-screen">
      {/* Fixed Header */}
      <DashboardHeader user={user} />

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

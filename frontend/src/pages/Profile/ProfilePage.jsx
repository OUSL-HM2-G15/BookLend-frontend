import React from "react";
import DashboardHeader from "../../components/DashboardHeader";
import DashboardSideBar from "../../components/DashboardSideBar";
import Footer from "../../components/Footer";

const ProfilePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">

      {/* Header */}
      <DashboardHeader />

      {/* Main layout */}
      <div className="flex flex-1">
        
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-300 p-4">
          <DashboardSideBar />
        </aside>

        {/* Main content */}
        <main className="flex-1 flex justify-center items-start p-6 pt-28 overflow-y-auto">
          <div className="bg-white rounded-[32px] shadow-lg p-8 w-full max-w-[1006px] flex flex-col items-center">

            {/* Change Photo */}
            <div className="flex flex-col items-center mb-6 mt-4">
              <button className="bg-gray-300 text-gray-800 px-16 py-3 rounded-2xl font-semibold text-sm hover:bg-gray-400 w-full">
                Change Photo
              </button>
              <p className="text-gray-500 text-sm mt-2 text-center">
                Update your personal information and preferences.
              </p>
            </div>

            {/* Form Fields: labels left, inputs right */}
            <div className="space-y-4 w-full max-w-[600px]">
              {[
                { label: "Username", placeholder: "Display Name" },
                { label: "Full Name", placeholder: "Your Full Name" },
                { label: "Email", placeholder: "example@gmail.com" },
                { label: "Location", placeholder: "Your Pickup Location" },
                { label: "Phone Number", placeholder: "+94 XXX XXX XXX" },
                { label: "WhatsApp", placeholder: "+94 XXX XXX XXX" },
              ].map((field) => (
                <div key={field.label} className="flex items-center space-x-4">
                  <label className="w-36 font-bold text-sm">{field.label}:</label>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    className="flex-1 border border-gray-300 rounded-xl p-3 text-sm"
                  />
                </div>
              ))}
            </div>

            {/* Cancel / Save buttons centered */}
            <div className="flex justify-center space-x-4 mt-8">
              <button className="bg-gray-500 text-white px-6 py-3 rounded-2xl text-sm font-semibold hover:bg-gray-600">
                Cancel
              </button>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-2xl text-sm font-semibold hover:bg-blue-700">
                Save Changes
              </button>
            </div>

          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProfilePage;

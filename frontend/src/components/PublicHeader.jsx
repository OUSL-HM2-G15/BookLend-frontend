import React from "react";

// Flower Logo Component
const FlowerLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#4c8bf5"
    viewBox="0 0 24 24"
    className="w-8 h-8"
  >
    <path d="M12 2a1 1 0 0 1 1 1v2.07A7.002 7.002 0 0 1 19.93 11H22a1 1 0 1 1 0 2h-2.07A7.002 7.002 0 0 1 13 18.93V21a1 1 0 1 1-2 0v-2.07A7.002 7.002 0 0 1 4.07 13H2a1 1 0 1 1 0-2h2.07A7.002 7.002 0 0 1 11 4.07V2a1 1 0 0 1 1-1zM12 8a4 4 0 1 0 0 8a4 4 0 0 0 0-8z" />
  </svg>
);

export default function PublicHeader({ onLoginClick, onRegisterClick }) {
  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Side: Logo */}
          <div className="flex items-center space-x-3">
            <FlowerLogo />
            <span className="text-2xl font-bold text-gray-900 tracking-tight">
              BookLend
            </span>
          </div>

          {/* Right Side: Buttons */}
          <div className="flex items-center space-x-4">
            <button
              className="px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50 transition"
              onClick={onLoginClick}
            >
              Login
            </button>
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition"
              onClick={onRegisterClick}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

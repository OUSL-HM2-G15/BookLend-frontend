 feature/borrowed-books-ui
const Footer = () => {
  return (
    <footer className="flex-shrink-0 h-14 border-t bg-white flex items-center justify-between px-6 text-gray-500 text-sm">
      {/* Left links */}
      <div className="flex space-x-4">
        <a href="#" className="hover:text-indigo-600 transition">About</a>
        <a href="#" className="hover:text-indigo-600 transition">Terms of Service</a>
        <a href="#" className="hover:text-indigo-600 transition">Privacy Policy</a>
      </div>

      {/* Right copyright */}
      <div>© 2025 BookSphere. All rights reserved.</div>

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-8 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
        {/* Copyright */}
        <div className="order-1 sm:order-2 mt-4 sm:mt-0">
          &copy; 2026 BookLend . All Rights reserved.
        </div>

        {/* Links */}
        <div className="order-2 sm:order-1 flex space-x-4">
          <a
            href="/about" 
            className="hover:text-indigo-600 transition duration-150 ease-in-out"
          >
            About
          </a>
          <a
            href="/terms-of-service" 
            className="hover:text-indigo-600 transition duration-150 ease-in-out"
          >
            Terms of Services
          </a>
          <a
            href="/privacy-policy" 
            className="hover:text-indigo-600 transition duration-150 ease-in-out"
          >
            Privacy Policy
          </a>
        </div>
      </div>
feature/borrowed-books-ui
    </footer>
  );
};

export default Footer;
//import React, { useState } from 'react';
// import LoginPopup from './Login'; 
// import RegisterPopup from './Register';

// FlowerLogo SVG (kept for context, hidden for brevity)
const FlowerLogo = () => (
    <svg className="w-8 h-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="3" /><circle cx="12" cy="5" r="2" opacity="0.7" /><circle cx="12" cy="19" r="2" opacity="0.7" /><circle cx="5" cy="12" r="2" opacity="0.7" /><circle cx="19" cy="12" r="2" opacity="0.7" />
    </svg>
);


const PublicHeader = () => {
  // State for controlling Login Popup visibility
  //const [isLoginOpen, setIsLoginOpen] = useState(false);
  
  // State for controlling Register Popup visibility
  //const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Left Side: Logo and Name */}
          <div className="flex items-center space-x-3">
            <FlowerLogo />
            <span className="text-2xl font-bold text-gray-900 tracking-tight">
              BookLend
            </span>
          </div>

          {/* Right Side: Action Buttons */}
          <div className="flex items-center space-x-4">
            <button 
              className="px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50 transition duration-150"
              // onClick={() => setIsLoginOpen(true)} // Opens the Login popup
            >
              Login
            </button>
            <button 
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 transition duration-150"
              // onClick={() => setIsRegisterOpen(true)} // Opens the Register popup
            >
              Register
            </button>
          </div>

        </div>
      </div>
 
      {/* RENDER THE POPUPS 
      <LoginPopup 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} // Function to close Login
      />
      <RegisterPopup 
        isOpen={isRegisterOpen} 
        onClose={() => setIsRegisterOpen(false)} // Function to close Register
      />
      */}

    </header>
  );
};

export default PublicHeader;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ onLogout }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate(); // hook to programmatically navigate

  const handleConfirmLogout = () => {
    onLogout();               // clear user/session
    setShowConfirm(false);    // close modal
    navigate('/');      // navigate to SignIn route
  };

  return (
    <header className="flex justify-between items-center px-6 h-[72px] bg-white shadow-sm sticky top-0 z-10">
      {/* Left: Logo + BookLend */}
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="Logo" className="w-8 h-8" />
        <h1 className="text-xl font-bold text-black">BookLend</h1>
      </div>

      {/* Right: Logout + Avatar */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setShowConfirm(true)}
          className="border border-red-400 text-red-500 px-4 py-1 rounded hover:bg-red-50 transition duration-200"
        >
          Logout
        </button>

        {/* User avatar circle */}
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-semibold cursor-pointer hover:scale-105 transition duration-200">
          <span>U</span>
        </div>
      </div>

      {/* Confirmation modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <p className="text-gray-700 mb-4">Are you sure you want to log out?</p>
            <div className="flex justify-center gap-3">
              <button
                onClick={handleConfirmLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
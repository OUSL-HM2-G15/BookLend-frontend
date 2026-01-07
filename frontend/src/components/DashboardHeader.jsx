import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";

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

// for test logout right now
const DashboardHeader = ({ user, onLogout, setShowAddBook }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false); // <--- Loading state
  const navigate = useNavigate();

  //  Navigation handlers
  const handleProfile = () => navigate("/profile");

  const handleLogout = async () => {

  setLoading(true); // show "Logging out..." 

  try {

    if (onLogout) {
      await onLogout(); // wait for app logout
    }

    setShowConfirm(false);
    navigate("/"); // redirect after logout
  } finally {
    setLoading(false);
  }
};

  const userImage = user?.profilePic || "https://via.placeholder.com/40";
  const userName = user?.name || "Guest";

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="w-full px-6">
          <div className="flex justify-between items-center h-16">
            {/* Left: Logo */}
            <div className="flex items-center space-x-4">
              <FlowerLogo />
              <span className="text-2xl font-bold text-gray-900 tracking-tight">BookLend</span>
            </div>
            {/* Right: Buttons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowAddBook(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                + Add Book
              </button>

              <button
                onClick={() => setShowConfirm(true)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
              >
                Logout
              </button>

            <img
              src={userImage}
              alt={userName}
              className="w-10 h-10 rounded-full cursor-pointer border border-gray-300"
              onClick={handleProfile}
            />
            </div>
          </div>
        </div>
       </div>
      </header>

      {/* Logout Confirmation Modal */}
      <ConfirmModal
        open={showConfirm}
        title="Confirm Logout"
        description="Are you sure you want to log out?"
        okText={loading ? "Logging out..." : "Logout"} // show loader text
        cancelText="Cancel"
        onConfirm={handleLogout}
        onCancel={() => setShowConfirm(false)}
        disabled={loading}
      />
    </>
  );
};

export default DashboardHeader;
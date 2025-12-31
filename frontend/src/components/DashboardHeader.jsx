import  { useState } from "react";
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
const DashboardHeader = ({ user , onLogout, setShowAddBook }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  // Sign-out confirm handler  
  const handleConfirmLogout = () => {
    if (onLogout) onLogout(); // call parent logout handler
    setShowConfirm(false);
    navigate("/"); // redirect to sign-in or home
  };

  // const navigate = useNavigate();

  // 🔹 Handle logout
  // const handleLogout = async () => {
  //   try {
  //     await axios.post("http://localhost:5000/api/user/logout");
  //     localStorage.removeItem("token"); // clear stored auth token
  //     navigate("/login"); // redirect to login page
  //   } catch (error) {
  //     console.error("Logout failed:", error);
        // even if logout API fails, still clear token and redirect
        // localStorage.removeItem("token");
        // navigate("/login");
  //   }
  // };

  //  Navigation handlers
  // const handleProfile = () => navigate("/profile");

  const userImage = user?.profilePic || "https://via.placeholder.com/40";
  const userName = user?.name || "Guest";

  return (
    <>
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="w-full px-6">
        <div className="flex justify-between items-center h-16">

          {/* Left Side: Logo + Name */}
          <div className="flex items-center space-x-4">
            <FlowerLogo />
            <span className="text-2xl font-bold text-gray-900 tracking-tight">
              BookLend
            </span>
          </div>

          {/* Right Side: Buttons + Profile */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowAddBook(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              + Add Book
            </button>

            <button
              //onClick={handleLogout}
              onClick={() => setShowConfirm(true)}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
            >
              Logout
            </button>

            <img
              src={userImage}
              alt={userName}
              className="w-10 h-10 rounded-full cursor-pointer border border-gray-300"
              //onClick={handleProfile}
            />
          </div>

        </div>
      </div>
      </header>
      {/* Logout Confirmation Modal */}
       <ConfirmModal
        open={showConfirm}
        title="Confirm Logout"
        description="Are you sure you want to log out?"
        okText="Logout"
        cancelText="Cancel"
        onConfirm={handleConfirmLogout}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
};

export default DashboardHeader;

// Notes:
// - The user fetching and logout logic is commented out for now.
// - Need to uncomment and adjust as per the backend API.
// - Used placeholder image and name if user data is not available.
// - Installed react-router-dom for navigation handling.
// - Keep the logout logic inside DashboardHeader, since it’s global and always visible.
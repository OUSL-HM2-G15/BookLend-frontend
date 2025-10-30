// import React from "react";
//import axios from "axios";
//import { useNavigate } from "react-router-dom";

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

const DashboardHeader = ({ user }) => { 
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

  // 🔹 Navigation handlers
  // const handleAddBook = () => navigate("/add-book");
  // const handleProfile = () => navigate("/profile");

  const userImage = user?.profilePic || "https://via.placeholder.com/40";
  const userName = user?.name || "Guest";

  return (
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
              //onClick={handleAddBook}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              + Add Book
            </button>

            <button
              //onClick={handleLogout}
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
  );
};

export default DashboardHeader;

// Notes:
// - The user fetching and logout logic is commented out for now.
// - Need to uncomment and adjust as per the backend API.
// - Used placeholder image and name if user data is not available.
// - Installed react-router-dom for navigation handling.
// - Keep the logout logic inside DashboardHeader, since it’s global and always visible.
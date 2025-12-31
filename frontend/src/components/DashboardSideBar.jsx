import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { name: "Explore", path: "/explore" }, // not use file paths, need route paths
    { name: "My Books", path: "/my-books" },
    { name: "My Borrowed Books", path: "/borrowed-books" },
    { name: "My Lended Books", path: "/my-lended-books" },
    { name: "Requests Received", path: "/requests-received" },
    { name: "Requests Posted", path: "/requests-posted" },

  ];

  return (
    <aside className="hidden md:flex fixed top-16 left-0 bottom-0 w-64 bg-white border-r p-4 overflow-auto z-40">
      <nav className="flex flex-col space-y-8">
         {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end
            className={({ isActive }) =>
              `block px-4 py-4 rounded-md text-gray-800 font-medium transition ${
                isActive 
                ? "bg-blue-100 text-blue-600 font-semibold" 
                : "hover:bg-gray-100"
              }`
            }
          >
            {link.name}
          </NavLink> 
         ))} 
      </nav>
    </aside>
  );
};

export default Sidebar;

// note:
// Used NavLink from react-router-dom to handle active link styling
// Sidebar is fixed position with height adjusted for header
// Links are mapped from an array for easy addition/removal
// Applied Tailwind CSS classes for styling and responsiveness
// Ensure route paths match those defined in Dashboard.jsx routing
// Once created the sub pages then uncomment the links to enable navigation
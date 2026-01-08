import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { name: "Explore", path: "/explore" },
    { name: "My Books", path: "/my-books" },
    { name: "My Borrowed Books", path: "/my-borrowed-books" },
    { name: "My Lended Books", path: "/my-lended-books" },
    { name: "Requests Received", path: "/requests-received" },
    { name: "Requests Posted", path: "/requests-posted" },
  ];

  return (
    <aside className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-300 p-4">
      <nav className="flex flex-col space-y-5">
         {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md text-gray-800 font-medium transition ${
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

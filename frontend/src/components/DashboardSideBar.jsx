import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { name: "Explore", path: "/dashboard/explore" }, // not use file paths, need route paths
    { name: "My Books", path: "/dashboard/my-books" },
    { name: "My Borrowed Books", path: "/dashboard/my-borrowed-books" },
    { name: "My Lended Books", path: "/dashboard/my-lended-books" },
    { name: "Requests Received", path: "/dashboard/requests-received" },
    { name: "Requests Posted", path: "/dashboard/requests-posted" },
  ];

  return (
    <aside className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-300 p-4">
      <nav className="flex flex-col space-y-5">
         {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
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

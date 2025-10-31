import { NavLink } from "react-router-dom";
const Sidebar = () => {
  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Explore", path: "/explore" },
    { name: "My Books", path: "/my-books" },
    { name: "My Borrowed Books", path: "/borrowed-books" },
    { name: "My Lended Books", path: "/lended-books" },
    { name: "Requests Received", path: "/requests-received" },
    { name: "Requests Posted", path: "/requests-posted" },
  ];

  return (
    <nav className="flex-1 overflow-y-auto min-h-0 mt-4 space-y-1">
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            `block px-6 py-2 rounded-r-full transition duration-200 ${isActive
              ? "bg-indigo-100 text-indigo-700 font-semibold"
              : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
};

export default Sidebar;
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
    </footer>
  );
};

export default Footer;
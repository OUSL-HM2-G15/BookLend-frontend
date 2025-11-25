
const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-8 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
        {/* Links */}
        <div className="order-2 sm:order-1 flex space-x-4 mb-2 sm:mb-0">
          <a
            href="/about"
            className="hover:text-indigo-600 transition duration-150 ease-in-out"
          >
            About
          </a>
          <a
            href="/terms-of-service"
            className="hover:text-indigo-600 transition duration-150 ease-in-out"
          >
            Terms of Service
          </a>
          <a
            href="/privacy-policy"
            className="hover:text-indigo-600 transition duration-150 ease-in-out"
          >
            Privacy Policy
          </a>
        </div>

        {/* Copyright */}
        <div className="order-1 sm:order-2">
          &copy; 2026 BookLend. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
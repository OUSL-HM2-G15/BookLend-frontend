import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "../components/LoginModal";


const BorrowedBooks = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Simulated login
  const [showLoginModal, setShowLoginModal] = useState(false);

  const borrowedBooks = [
    {
      id: 1,
      title: "It Ends With Us",
      author: "Colleen Hoover",
      location: "Kandy",
      price: 50,
      status: "Pending",
      image:
        "https://m.media-amazon.com/images/I/71PNGYHykrL._AC_UF1000,1000_QL80_.jpg",
    },
    {
      id: 2,
      title: "Harry Potter",
      author: "J.K. Rowling",
      location: "Kandy",
      price: 100,
      status: "Accepted",
      image:
        "https://m.media-amazon.com/images/I/81YOuOGFCJL._AC_UF1000,1000_QL80_.jpg",
    },
  ];

  // If not logged in → ask to login
  if (!isLoggedIn) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">
          Please log in to view your borrowed books
        </h1>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Go to Login
        </button>
      </div>
    );
  }
  const handleLogout = () => {
    navigate("/")
          // open login modal
  };
  // If not logged in, the modal will show automatically
  if (!isLoggedIn && !showLoginModal) {
    setShowLoginModal(true);
  }

  // If user is not logged in and modal open, main content still renders underneath
  return (
    <>
      {/* Login Modal */}
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}

      {/* Dashboard layout */}
      <di onLogout={handleLogout}>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl mb-8 text-black tracking-wide leading-snug">
            My Borrowed Books
          </h1>

          <div className="space-y-6 max-w-3xl mx-auto">
            {borrowedBooks.map((book) => (
              // Outer square container
              <div
                key={book.id}
                className="bg-gray-100 shadow-md p-4 border border-gray-300 transition duration-300"
              >
                {/* Inner hoverable box */}
                <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transform hover:-translate-y-1 transition duration-300 ease-in-out">
                  {/* Book image */}
                  <div className="md:w-40 flex-shrink-0">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-60 object-cover"
                    />
                  </div>

                  {/* Book details */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{book.title}</h3>
                      <p className="text-sm text-gray-600">Author: {book.author}</p>
                      <p className="text-sm text-gray-600">Location: {book.location}</p>
                      <p className="text-sm text-gray-600">
                        Price per week: Rs. {book.price}
                      </p>

                      <div className="mt-3">
                        <span className="font-semibold">Status: </span>
                        <span
                          className={`px-3 py-1 rounded text-white text-sm ${book.status === "Pending"
                              ? "bg-yellow-400"
                              : "bg-green-500"
                            }`}
                        >
                          {book.status}
                        </span>
                      </div>
                    </div>

                    {/* Action button */}
                    <div className="mt-4">
                      {book.status === "Pending" ? (
                        <button className="border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-50 transition duration-200">
                          Cancel Request
                        </button>
                      ) : (
                        <button className="border border-green-500 text-green-600 px-4 py-2 rounded hover:bg-green-50 transition duration-200">
                          View Details
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </di>
    </>
  );
};

export default BorrowedBooks;     
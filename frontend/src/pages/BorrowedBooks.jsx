import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { message, Tooltip, Modal } from "antd";
import { InfoCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

const BorrowedBooks = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch borrowed books from backend
  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token"); // JWT from login
        const res = await axios.get("http://localhost:8080/api/borrow-requests", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBorrowedBooks(res.data); // backend should return array of borrowed books
      } catch (err) {
        console.error(err);
        setError("Failed to fetch borrowed books.");
      } finally {
        setLoading(false);
      }
    };
    fetchBorrowedBooks();
  }, []);

  // One-time accepted notification
  useEffect(() => {
    borrowedBooks.forEach((book) => {
      if (book.status === "Accepted" && !localStorage.getItem(`seen-${book.requestId}`)) {
        message.info(`Your borrow request for "${book.title}" has been accepted!`);
        localStorage.setItem(`seen-${book.requestId}`, "true");
      }
    });
  }, [borrowedBooks]);

  // Cancel borrow request
  const handleCancelRequest = (requestId) => {
    confirm({
      title: "Cancel Borrow Request",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure you want to cancel this borrow request?",
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        try {
          const token = localStorage.getItem("token");
          await axios.delete(`http://localhost:8080/api/borrow-requests/${requestId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setBorrowedBooks(borrowedBooks.filter((book) => book.requestId !== requestId));
          message.success("Borrow request cancelled.");
        } catch (err) {
          console.error(err);
          message.error("Failed to cancel request.");
        }
      },
    });
  };

  // Close button for Returned/Rejected
  const handleCloseCard = (requestId) => {
    setBorrowedBooks(borrowedBooks.filter((book) => book.requestId !== requestId));
  };

  // Loading state
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-lg">Loading borrowed books...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  // No borrowed books
  if (borrowedBooks.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-700 text-lg">You have no borrowed books.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-8 text-black">My Borrowed Books</h1>

      <div className="space-y-6">
        {borrowedBooks.map((book) => (
          <div
            key={book.requestId}
            className={`bg-gray-100 shadow-md p-4 border border-gray-300 transition duration-300 rounded ${book.status === "Accepted" ? "hover:shadow-2xl transform hover:-translate-y-1" : ""
              }`}
          >
            <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transform hover:-translate-y-1 transition duration-300 ease-in-out relative">

              {/* Book image */}
              <div className="md:w-40 flex-shrink-0 relative">
                <img src={book.imageUrl} alt={book.title} className="w-full h-60 object-cover" />

                {/* Info icon for Accepted books */}
                {book.status === "Accepted" && book.owner && (
                  <Tooltip
                    title={
                      <div className="space-y-1 text-sm">
                        <p><strong>Owner:</strong> {book.owner.name}</p>
                        <p><strong>Phone:</strong> {book.owner.phone}</p>
                        <p><strong>WhatsApp:</strong> {book.owner.whatsappNumber}</p>
                        {book.requestedDate && <p><strong>Requested:</strong> {new Date(book.requestedDate).toLocaleDateString()}</p>}
                        {book.acceptedDate && <p><strong>Accepted:</strong> {new Date(book.acceptedDate).toLocaleDateString()}</p>}
                        {book.returnedDate ? (
                          <p><strong>Returned:</strong> {new Date(book.returnedDate).toLocaleDateString()}</p>
                        ) : (
                          <p><strong>Returned:</strong> Pending</p>
                        )}
                      </div>
                    }
                    placement="topRight"
                  >
                    <InfoCircleOutlined className="absolute top-2 right-2 text-blue-600 text-lg cursor-pointer" />
                  </Tooltip>
                )}
              </div>

              {/* Book details */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{book.title}</h3>
                  <p className="text-sm text-gray-600">Author: {book.author}</p>
                  <p className="text-sm text-gray-600">Location: {book.locationName}</p>
                  <p className="text-sm text-gray-600">Price per week: Rs. {book.feePerWeek}</p>

                  {/* Status badge */}
                  <div className="mt-3">
                    <span className="font-semibold">Status: </span>
                    <span
                      className={`px-3 py-1 rounded text-white text-sm ${book.status === "Pending"


                          ? "bg-yellow-400"
                          : book.status === "Accepted"
                            ? "bg-green-500"
                            : book.status === "Rejected"
                              ? "bg-red-500"
                              : "bg-gray-500"
                        }`}
                    >
                      {book.status}
                    </span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {book.status === "Pending" && (
                    <button
                      className="border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-50 transition duration-200"
                      onClick={() => handleCancelRequest(book.requestId)}
                    >
                      Cancel Request
                    </button>
                  )}
                  {(book.status === "Accepted" || book.status === "Returned") && (
                    <Link
                      to={`/book/${book.bookId}`}
                      className="border border-green-500 text-green-600 px-4 py-2 rounded hover:bg-green-50 transition duration-200"
                    >
                      View Details
                    </Link>
                  )}
                  {(book.status === "Returned" || book.status === "Rejected") && (
                    <button
                      className="border border-gray-500 text-gray-600 px-4 py-2 rounded hover:bg-gray-100 transition duration-200"
                      onClick={() => handleCloseCard(book.requestId)}
                    >
                      Close
                    </button>
                  )}
                </div>

              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BorrowedBooks;

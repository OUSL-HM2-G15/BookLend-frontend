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
  const [historyError, setHistoryError] = useState("");
  const [historyBooks, setHistoryBooks] = useState([]); // For borrow history
  const [showHistory, setShowHistory] = useState(false); // Toggle state for history
  const [isClosing, setIsClosing] = useState(false); // To track if a book is being closed

  const fetchBorrowedBooks = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("You are not logged in.");
        return;
      }

      const res = await fetch(`${process.env.REACT_APP_API_URL}/borrow-requests/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Check response status
      if (!res.ok) throw new Error("Failed to fetch borrowed books");

      const data = await res.json();

      // Filter out Cancelled AND closed-by-user books
      const closedIds = JSON.parse(localStorage.getItem("closedBooks") || "[]");
      const activeBooks = data.filter(
        (book) => book.status !== "Cancelled" && !closedIds.includes(book.requestId)
      );
      setBorrowedBooks(activeBooks); // Only set active books
    } catch (err) {
      console.error(err);
      setError("Failed to fetch borrowed books.");
    } finally {
      setLoading(false);
    }
  };
  // Fetch borrow history (including cancelled/closed books)
  const fetchHistory = async () => {
    try {
      setHistoryError(""); // reset previous error
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("You are not logged in.");
        return;
      }

      const res = await fetch(`${process.env.REACT_APP_API_URL}/borrow-requests/history`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch borrow history");

      const data = await res.json();
      setHistoryBooks(data); // Set history
    } catch (err) {
      console.error(err);
      setHistoryError("No borrow history available.");
      setHistoryBooks([]); // clear history if fetch fails
    }
  };

  // Fetch books on component mount
  useEffect(() => {
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
          await axios.delete(`${process.env.REACT_APP_API_URL}/borrow-requests/${requestId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setBorrowedBooks((prevBooks) => prevBooks.filter((book) => book.requestId !== requestId));
          message.success("Borrow request cancelled.");
        } catch (err) {
          console.error(err);
          message.error("Failed to cancel request.");
        }
      },
    });
  };

  const handleCloseCard = async (requestId) => {
    if (isClosing) return; // prevent double clicks
    setIsClosing(true);

    try {
      const token = localStorage.getItem("token");

      // Call backend to close request
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/borrow-requests/${requestId}/close`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        const updatedBook = response.data;

        // Save closed request ID in localStorage
        const closedIds = JSON.parse(localStorage.getItem("closedBooks") || "[]");
        if (!closedIds.includes(requestId)) closedIds.push(requestId);
        localStorage.setItem("closedBooks", JSON.stringify(closedIds));

        // Update frontend state
        setBorrowedBooks((prevBooks) =>
          prevBooks.filter((book) => book.requestId !== requestId)
        );
        setHistoryBooks((prevHistory) => [...prevHistory, updatedBook]);

        message.success("Request closed and moved to history.");
      } else {
        message.error("Failed to close request.");
      }
    } catch (err) {
      console.error(err);
      message.error("Failed to close request.");
    } finally {
      setIsClosing(false);
    }
  };



  // Re-request Borrowed Book (for Cancelled status)
  const handleReRequest = async (requestId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${process.env.REACT_APP_API_URL}/borrow-requests/${requestId}/re-request`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Move the book from history to active borrowed books (change status to "Pending")
      const updatedBook = historyBooks.find((book) => book.requestId === requestId);
      updatedBook.status = "Pending"; // Change status to Pending
      setHistoryBooks((prevHistory) => prevHistory.filter((book) => book.requestId !== requestId));
      setBorrowedBooks((prevBooks) => [...prevBooks, updatedBook]);

      message.success("Request re-submitted successfully.");
    } catch (err) {
      console.error(err);
      message.error("Failed to re-request book.");
    }
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
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <p className="text-lg text-red-500 mb-4">{error}</p>
      <button
        onClick={fetchBorrowedBooks}
        className="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
      >
        Retry
      </button>
    </div>
  );
}


  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-8 text-black">My Borrowed Books</h1>
      {/* Page description */}
 <p className="text-gray-600 mb-6">
 This is where the list of books you have borrowed will be displayed.
 </p>

      {/* Toggle Button for Borrow History */}
      <button
        onClick={() => {
          if (!showHistory) {
            fetchHistory(); // Fetch history if user toggles to history view
          }
          setShowHistory(!showHistory);
        }}
        className="mb-6 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition duration-200"
      >
        {showHistory ? "Back to Active Books" : "View Borrow History"}
      </button>

      <div className="space-y-6">
        {showHistory ? (
          historyBooks.length > 0 ? (
            historyBooks.map((book) => (
              <div key={book.requestId} className={`bg-gray-100 shadow-md p-4 border border-gray-300 transition duration-300 rounded`}>
                <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transform hover:-translate-y-1 transition duration-300 ease-in-out relative">
                  <div className="md:w-40 flex-shrink-0 relative">
                    <img src={book.imageUrl} alt={book.title} className="w-full h-60 object-cover" />
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{book.title}</h3>
                      <p className="text-sm text-gray-600">Author: {book.author}</p>
                      <p className="text-sm text-gray-600">Location: {book.locationName}</p>
                      <p className="text-sm text-gray-600">Price per week: Rs. {book.feePerWeek}</p>

                      <div className="mt-3">
                        <span className="font-semibold">Status: </span>
                        <span className={`px-3 py-1 rounded text-white text-sm ${book.status === "Pending" ? "bg-yellow-400" :
                          book.status === "Accepted" ? "bg-green-500" :
                            book.status === "Rejected" ? "bg-red-500" :
                              book.status === "Returned" ? "bg-gray-500" :
                                book.status === "Cancelled" ? "bg-purple-500" : "bg-gray-500"
                          }`}>
                          {book.status}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {book.status === "Cancelled" && (
                        <button
                          className="border border-blue-500 text-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition duration-200"
                          onClick={() => handleReRequest(book.requestId)}
                        >
                          Re-request
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-700 text-lg">{historyError || "No borrow history available."}</p>
  )
) : null}

        {/* Show Borrowed Books (Active Requests) */}
        {!showHistory ? (
          borrowedBooks.length > 0 ? (
            borrowedBooks.map((book) => (
              <div key={book.requestId} className={`bg-gray-100 shadow-md p-4 border border-gray-300 transition duration-300 rounded ${book.status === "Accepted" ? "hover:shadow-2xl transform hover:-translate-y-1" : ""}`}>
                <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transform hover:-translate-y-1 transition duration-300 ease-in-out relative">
                  <div className="md:w-40 flex-shrink-0 relative">
                    <img src={book.imageUrl} alt={book.title} className="w-full h-60 object-cover" />
                    {book.status === "Accepted" && book.owner && (
                      <Tooltip
                        title={
                          <div className="space-y-1 text-sm">
                            <p><strong>Owner:</strong> {book.owner.name}</p>
                            <p><strong>Phone:</strong> {book.owner.phone}</p>
                            <p><strong>WhatsApp:</strong> {book.owner.whatsappNumber}</p>
                            {book.requestedDate && <p><strong>Requested:</strong> {new Date(book.requestedDate).toLocaleDateString()}</p>}
                            {book.acceptedDate && <p><strong>Accepted:</strong> {new Date(book.acceptedDate).toLocaleDateString()}</p>}
                            {book.returnedDate ? <p><strong>Returned:</strong> {new Date(book.returnedDate).toLocaleDateString()}</p> : <p><strong>Returned:</strong> Pending</p>}
                          </div>
                        }
                        placement="topRight"
                      >
                        <InfoCircleOutlined className="absolute top-2 right-2 text-blue-600 text-lg cursor-pointer" />
                      </Tooltip>
                    )}
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{book.title}</h3>
                      <p className="text-sm text-gray-600">Author: {book.author}</p>
                      <p className="text-sm text-gray-600">Location: {book.locationName}</p>
                      <p className="text-sm text-gray-600">Price per week: Rs. {book.feePerWeek}</p>

                      <div className="mt-3">
                        <span className="font-semibold">Status: </span>
                        <span className={`px-3 py-1 rounded text-white text-sm ${book.status === "Pending" ? "bg-yellow-400" :
                          book.status === "Accepted" ? "bg-green-500" :
                            book.status === "Rejected" ? "bg-red-500" :
                              book.status === "Returned" ? "bg-gray-500" :
                                book.status === "Cancelled" ? "bg-purple-500" : "bg-gray-500"
                          }`}>
                          {book.status}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {book.status === "Pending" && (
                        <button aria-label="Cancel borrow request" className="border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-50 transition duration-200" onClick={() => handleCancelRequest(book.requestId)}>
                          Cancel Request
                        </button>
                      )}
                      {(book.status === "Accepted" || book.status === "Returned") && (
                        <Link to={`/books/${book.bookId}`} aria-label="View book details" className="border border-green-500 text-green-600 px-4 py-2 rounded hover:bg-green-50 transition duration-200">
                          View Details
                        </Link>
                      )}
                      {(book.status === "Returned" || book.status === "Rejected") && (
                        <button aria-label="Close request" className="border border-gray-500 text-gray-600 px-4 py-2 rounded hover:bg-gray-100 transition duration-200" onClick={() => handleCloseCard(book.requestId)}>
                          Close
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 py-10">You have no borrowed books.</p> 
          )
        ) : null}
      </div>
    </div>
  );
};

export default BorrowedBooks;

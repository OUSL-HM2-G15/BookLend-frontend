// This is the BookDetails.jsx file for users to view book details and send borrow requests.

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";
import { message, Tooltip } from "antd";

const BookDetails = () => {
  const { id } = useParams(); // URL: /book/:id
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); 
  const [isModalVisible, setIsModalVisible] = useState(false);

const handleBorrowClick = () => {
    setIsModalVisible(true);
  };

const handleConfirm = async () => {
  setIsModalVisible(false);
  try {
    // Call API to send borrow request

    message.success(
      `You have requested to borrow "${book.title}". Please wait until the owner approves your request.`,
      4
    );
  } catch (error) {
    message.error("Failed to send borrow request. Try again.");
  }
};

  // Fetch book data from backend
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/books/${id}`);
        setBook(res.data);
      } catch (err) {
        console.error("Failed to load book:", err);
        setError("Unable to load book details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-20 text-xl font-semibold">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-20 text-red-600 font-semibold">
        {error}
      </div>
    );
  }

  if (!book) {
    return (
      <div className="text-center mt-20 text-xl font-semibold text-red-500">
        Book not found.
      </div>
    );
  }

  return (
    <div>
      {/* Page offset for fixed header */}
      <main>
      {/* Main container */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* LEFT SIDE */}
        <div >
          <div className="border rounded-lg p-4 shadow-md overflow-hidden">
            <img
              src={book.imageUrl || "/default-book.png"}
              alt={book.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-2">Description</h3>
          <p className="text-gray-700 leading-relaxed">
            {book.description}
          </p>

        <Tooltip
            title={
               book.status !== "Available"
                ? "This book is currently not available for borrowing"
                : ""
          }
        >
         <span>
            <button
              disabled={book.status !== "Available"}
              className={`py-2 px-4 rounded-lg mt-6 transition 
               ${
                book.status !== "Available"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
               }`}
             onClick={handleBorrowClick}
            >
              Borrow Request
            </button>
         </span>
        </Tooltip>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-6">Book Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-gray-800">
            <span className="font-medium">Title</span>
            <p>{book.title}</p>

            <span className="font-medium">Author</span>
            <p>{book.author}</p>

            <span className="font-medium">Published Year</span>
            <p>{book.publishedYear}</p>

            <span className="font-medium">Available Location</span>
            <p>{book.availableLocation?.locationName}</p>

            <span className="font-medium">Fee/week</span>
            <p>Rs. {book.feePerWeek}</p>

            <span className="font-medium">Category</span>
            <p>{book.category?.categoryName}</p>

            <span className="font-medium">Status</span>
            <p>{book.status}</p>

            <span className="font-medium">Owner Name</span>
            <p>
              {book.owner?.name || (
                 <span className="text-gray-400">Hidden</span>
             )}
            </p>

            <span className="font-medium">Mobile Number</span>
            <p>
              {book.owner?.phone || (
                 <span className="text-gray-400">Hidden</span>
             )}
            </p>

            <span className="font-medium">WhatsApp Number</span>          
            <p>
              {book.owner?.whatsappNumber || (
                 <span className="text-gray-400">Hidden</span>
             )}
            </p>
          </div>
        </div>
      </div>

      {/* Back link */}
      <div className="flex justify-end max-w-6xl mx-auto px-6 pb-10">
          <Link
            to="/explore"
            className="text-blue-600 px-4 py-2 border rounded-lg bg-gray-70 hover:bg-gray-200 transition"
          >
            ← Back to Dashboard
          </Link>
      </div>
      </main>

      {/* Ant Design Modal */}
      <ConfirmModal
        title="Confirm Borrow"
        open={isModalVisible}
        description={
          <p>
            Are you sure you want to borrow{" "}
            <strong>{book.title}</strong>?
          </p>
        }
        onConfirm={handleConfirm}
        onCancel={() => setIsModalVisible(false)}
      />
    </div>
  );
};

export default BookDetails;

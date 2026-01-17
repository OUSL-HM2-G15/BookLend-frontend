import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";
import { message } from "antd";

function BookCard({ book, isPublic = false, onLoginRequired, onOpenDetail }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigate = useNavigate();

  const handleCardClick = () => {
    if (isPublic && onOpenDetail) {
      onOpenDetail(book);  // open popup
    } else {
      navigate(`${book.bookId}`); // navigate
    }
  };

  const handleBorrowClick = (e) => {
    e.stopPropagation(); // Prevent card click
    if (isPublic && onLoginRequired) {
        onLoginRequired(); // open login modal
      } else {
        setIsModalVisible(true); // dashboard behavior
      }
  };

const handleConfirm = async () => {
  try {
    // Call API to send borrow request

    setIsModalVisible(false);

    message.success(
      `You have requested to borrow "${book.title}". Please wait until the owner approves your request.`,
      4
    );
  } catch (error) {
    message.error("Failed to send borrow request. Try again.");
  }
};

  return (
    <> 
      <div 
      className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-xl cursor-pointer
      transform transition-all duration-200 ease-in-out
      hover:-translate-y-1
      active:scale-[0.98]"
      onClick={handleCardClick}>
        
        {/* Book Image */}
        <div className="h-48 w-full overflow-hidden rounded-lg bg-gray-100">
          <img
            src={book.imageUrl || "https://via.placeholder.com/150"} 
            alt={book.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Book Details */}
        <div className="mt-4">
          <h2 className="text-lg font-semibold text-gray-900">{book.title}</h2>
          <p className="text-sm text-gray-600 mt-1">by {book.author || "Unknown"}</p>
          <p className="text-sm text-gray-700 mt-2">
            <span className="font-medium">Location:</span>{" "}
            {book.availableLocation?.locationName || "N/A"}
          </p>
          <p className="text-sm text-gray-700 mt-1">
            <span className="font-medium">Category:</span>{" "}
            {book.category?.categoryName || "N/A"}
          </p>
          <p className="text-sm text-gray-700 mt-1">
            <span className="font-medium">Fee/Week:</span>{" "}
            Rs. {book.feePerWeek || 0.0}
          </p>
        </div>

        {/* Borrow Button */}
        <button
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
            onClick={handleBorrowClick}
        >
          Borrow Request
        </button>
      </div>

      {/* Dashboard Confirm Modal */}
      {!isPublic && (
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
      )}
    </>
  );
}

export default BookCard;

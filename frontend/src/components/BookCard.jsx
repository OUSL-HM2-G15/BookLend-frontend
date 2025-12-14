import { Modal, message } from "antd";
import React, { useState } from "react";

function BookCard({ book }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleBorrowClick = () => {
    setIsModalVisible(true);
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

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition p-4 border border-gray-200">
        
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

      {/* Ant Design Modal */}
      <Modal
        title="Confirm Borrow"
        open={isModalVisible}
        onOk={handleConfirm}
        onCancel={handleCancel}
        okText="Confirm"
        cancelText="Cancel"
      >
        <p>Are you sure you want to borrow <strong>{book.title}</strong>?</p>
      </Modal>
    </>
  );
}

export default BookCard;

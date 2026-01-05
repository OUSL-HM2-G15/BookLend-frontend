import React from 'react';

const AlertMessage = ({ message, type, onClose }) => {
  // Define styles based on message type
  const alertStyles = {
    success: 'bg-green-100 text-green-700',
    error: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700',
  };

  return (
    <div
      className={`p-4 mb-4 rounded-md ${alertStyles[type] || alertStyles.info} flex items-center justify-between`}
    >
      <span>{message}</span>
      <button
        className="ml-4 text-xl font-bold"
        onClick={onClose}
        aria-label="Close alert"
      >
        ✖
      </button>
    </div>
  );
};

export default AlertMessage;

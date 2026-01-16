import React from "react";

const BookWantedRequestCard = ({ title, requester, location, onRespond }) => {
  return (
    <div className="w-full bg-white border rounded-lg p-5 shadow-sm flex flex-col sm:flex-row sm:justify-between sm:items-center">
      <div className="space-y-1">
        <p className="font-semibold text-lg">{title}</p>
        <p className="text-gray-600">Requested by: {requester}</p>
        <p className="text-gray-500 text-sm">Location: {location}</p>
      </div>

      <button
        onClick={onRespond}
        className="mt-3 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Post Book
      </button>
    </div>
  );
};

export default BookWantedRequestCard;

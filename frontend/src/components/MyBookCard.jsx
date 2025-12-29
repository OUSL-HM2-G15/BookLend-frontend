import React from "react";

const MyBookCard = ({ book, onEdit, onToggleStatus }) => {
  const {
    title,
    author,
    feePerWeek,
    locationName,
    categoryName,
    status,
    imageUrl,
  } = book;

  const isAvailable = status === "Available";

  return (
    <div className="flex gap-5 p-5 border rounded-xl bg-white shadow-sm hover:shadow-lg transition duration-300">
      
      {/* Left: Book Image */}
      <div className="w-40 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 h-60">
        <img
          src={imageUrl || "/placeholder-book.png"}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right: Book Details */}
      <div className="flex-1 flex flex-col justify-between">
    
        <div>
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-semibold text-gray-800 truncate">
              {title}
            </h3>

            {/* Status Badge */}
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full ${
                isAvailable
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {isAvailable ? "Available" : "Unavailable"}
            </span>
          </div>

          <p className="text-gray-500 mt-1 truncate">by {author}</p>

          <div className="mt-4 space-y-4 text-sm text-gray-600">
            <p>
              Location: <span className="font-medium">{locationName}</span>
            </p>
            <p>
              Category: <span className="font-medium">{categoryName}</span>
            </p>
            <p>
              Fee/week: <span className="font-medium">Rs. {feePerWeek}</span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-5">
          <button
            onClick={() => onEdit(book)}
            className="px-5 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Edit
          </button>

          {isAvailable ? (
            <button
              onClick={() => onToggleStatus(book.id, "Unavailable")}
              className="cursor-pointer px-5 py-2 text-sm rounded-lg min-w-[140px] bg-red-500 text-white hover:bg-red-700 transition"
            >
              Mark Unavailable
            </button>
          ) : (
            <button
              onClick={() => onToggleStatus(book.id, "Available")}
              className="cursor-pointer px-5 py-2 text-sm rounded-lg min-w-[140px] bg-green-500 text-white hover:bg-green-700 transition"
            >
              Mark Available
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookCard;

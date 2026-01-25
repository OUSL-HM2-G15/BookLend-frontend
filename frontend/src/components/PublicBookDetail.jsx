import React from "react";

export default function PublicBookDetail({ book, onClose }) {
  if (!book) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[95vh] overflow-y-auto relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="sticky top-0 ml-auto block text-gray-500 hover:text-gray-800 text-xl font-bold p-4 z-10 bg-white"
        >
          ✖
        </button>

        <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Left: Image & Description */}
          <div>
            <div className="border rounded-lg overflow-hidden">
              <img
                src={book.imageUrl || "https://via.placeholder.com/300x400"}
                alt={book.title}
                className="w-full h-56 sm:h-72 md:h-96 object-cover"
              />
            </div>

            {book.description && (
              <>
                <h3 className="text-lg sm:text-xl font-semibold mt-4 mb-2">
                  Description
                </h3>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  {book.description}
                </p>
              </>
            )}
          </div>

          {/* Right: Book Details */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-4">
              {book.title}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 text-gray-800 text-sm sm:text-base">
              <span className="font-medium">Author</span>
              <p>{book.author || "Unknown"}</p>

              <span className="font-medium">Published Year</span>
              <p>{book.publishedYear || "N/A"}</p>

              <span className="font-medium">Category</span>
              <p>{book.category?.categoryName || "N/A"}</p>

              <span className="font-medium">Location</span>
              <p>{book.availableLocation?.locationName || "N/A"}</p>

              <span className="font-medium">Fee / Week</span>
              <p>Rs. {book.feePerWeek || 0}</p>

              <span className="font-medium">Status</span>
              <p>{book.status || "N/A"}</p>

              {/* Hidden Owner Info */}
              <span className="font-medium">Owner Name</span>
              <p className="text-gray-400">Hidden</p>

              <span className="font-medium">Mobile Number</span>
              <p className="text-gray-400">Hidden</p>

              <span className="font-medium">WhatsApp</span>
              <p className="text-gray-400">Hidden</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

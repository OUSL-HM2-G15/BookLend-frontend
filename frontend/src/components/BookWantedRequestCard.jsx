import React from "react";

const BookWantedRequestCard = ({ title, requester, location, author, createdDate }) => {
  return (
    <div className="w-full bg-white border rounded-lg p-5 shadow-sm">
      <p className="text-gray-800 leading-relaxed">
        <span className="font-semibold">{requester}</span> is looking for the book{" "}
        <span className="font-semibold">"{title}"</span>
        {author && (
          <>
            {" "}by <span className="font-semibold">{author}</span>
          </>
        )}
        . This request was posted from{" "}
        <span className="font-medium">{location}</span>.
      </p>
      <div>
        <p>Requested On: <span className="font-medium">{createdDate}</span></p>
      </div>

      <p className="text-gray-500 text-sm mt-2">
        If you have this book, you can add it to your library and {requester} will be able to find it.
      </p>
    </div>
  );
};

export default BookWantedRequestCard;

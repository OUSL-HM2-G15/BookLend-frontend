import React from "react";
import { Tag } from "antd";

const statusStyles = {
  Pending: { border: "border-yellow-400", tag: "gold" },
  Accepted: { border: "border-green-500", tag: "green" },
  Rejected: { border: "border-red-500", tag: "red" },
  Returned: { border: "border-blue-500", tag: "blue" },
};

const LendedBookCard = ({
  imageUrl,
  title,
  author,
  pricePerWeek,
  borrowerName,
  borrowerLocation,
  requestDate,
  acceptedDate,
  returnedDate,
  status,
  acceptDisabled,
  disableReason,
  onAccept,
  onReject,
  onViewDetails,
  onMarkReturned,
}) => {
  const style = statusStyles[status];

  return (
    <div
      className={`max-w-full mx-auto flex gap-4 p-4 bg-white rounded-xl shadow-sm border-2 ${style.border}`}
    >
      {/* Book Image */}
      <div className="w-36 object-cover flex-shrink-0">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover rounded-md border"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between">
        {/* Header */}
        <div>
          <div className ="flex justify-between items-start">
            <div>
              <h2 className="text-base font-semibold text-gray-800">
                {title}
              </h2>
              <p className="text-xs text-gray-500">by {author}</p>
            </div>

            <Tag color={style.tag}>{status}</Tag>
          </div>

          {/* Details */}
          <div className="mt-3 text-sm text-gray-600 space-y-2">
            <p>
              <span className="font-medium">Price / week:</span> Rs. {pricePerWeek}
            </p>
            <p>
              <span className="font-medium">Borrower:</span> <span className="font-bold">{borrowerName}</span>
            </p>
            <p>
              <span className="font-medium">Requester Location:</span> <span className="font-bold">{borrowerLocation}</span>
            </p>
            <p>
              <span className="font-medium">Requested on:</span> {requestDate}
            </p>

            {status === "Accepted" && (
              <p className="text-green-600">
                <span className="font-medium">Accepted on:</span> {acceptedDate}
              </p>
            )}

            {status === "Returned" && (
              <p className="text-blue-600">
                <span className="font-medium">Returned on:</span> {returnedDate}
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex gap-2 justify-end">
        {status === "Pending" && (
            <>
            <button
                disabled={acceptDisabled}
                onClick={onAccept}
                title={disableReason}
                className="px-3 py-1.5 text-sm bg-green-500 text-white rounded-md hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Accept
            </button>
            <button
                onClick={onReject}
                className="px-3 py-1.5 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
                Reject
            </button>
            </>
        )}

        {status === "Accepted" && (
            <>
            <button
                onClick={onViewDetails}
                className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
            >
                View Details
            </button>
            <button
                onClick={onMarkReturned}
                className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
                Mark as Returned
            </button>
            </>
        )}
        </div>
      </div>
    </div>
  );
};

export default LendedBookCard;

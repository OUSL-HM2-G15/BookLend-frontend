import React, { useState } from "react";
import RequestBookPopup from "../components/RequestModal";

const RequestPosted = () => {
    const [showPopup, setShowPopup] = useState(false);
    const requests = [];

    return (
        <div className="relative flex-1 p-6 bg-gray-50 min-h-screen">
            {/* Centered requests container */}
            <div className="mb-6 flex justify-between items-start">
                <h1 className="text-3xl font-semibold text-gray-900">
                    Requests Posted
                </h1>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
                {requests.length === 0 ? (
                    <p className="text-gray-500">No requests posted yet.</p>
                ) : (
                    requests.map((request) => (
                        <div
                            key={request.id}
                            className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row items-start md:items-center"
                        >
                            <div className="flex-1">
                                <h2 className="text-lg font-semibold">{request.title}</h2>
                                <p className="text-gray-600">Requester: {request.requester}</p>
                                <p className="text-gray-600">Location: {request.location}</p>
                            </div>
                            <span
                                className={`mt-2 md:mt-0 px-3 py-1 rounded text-white ${request.status === "Pending" ? "bg-yellow-400" : "bg-green-500"
                                    }`}
                            >
                                {request.status}
                            </span>
                        </div>
                    ))
                )}
            </div>

            <div className="mt-8 flex justify-start">
                <button
                    onClick={() => setShowPopup(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    + New Request
                </button>
            </div>

            {showPopup && (
                <RequestBookPopup onClose={() => setShowPopup(false)} />
            )}
        </div>
    );
};

export default RequestPosted;
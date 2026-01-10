import React, { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";

const RequestsReceived = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/book-requests`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setRequests(res.data);
      } 
      catch (err) {
        console.error(err);
        setError("Unable to load requests.");
      } 
      finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleRespond = () => {
    message.success("The requester has been notified that you own this book.");
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-lg font-semibold">
        Loading requests...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-600 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="px-6 py-6">
      <h2 className="text-2xl font-bold mb-6">Requests Received</h2>

      {requests.length === 0 ? (
        <p className="text-gray-600">No book requests available.</p>
      ) : 
      (
        <div className="space-y-4">
          {requests.map((req) => 
          (
            <div
              key={req.id}
              className="border rounded-lg p-5 shadow-sm bg-white flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <div className="space-y-1">
                <p className="font-semibold text-lg">{req.bookTitle}</p>
                <p className="text-gray-600">
                  Requested by: {req.requestedBy}
                </p>
                <p className="text-gray-500 text-sm">
                  Location: {req.location}
                </p>
              </div>

              <button
                onClick={handleRespond}
                className="mt-3 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                I Have This Book
              </button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RequestsReceived;


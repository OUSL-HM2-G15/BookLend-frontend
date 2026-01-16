import { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd"; // no need to import Modal now
import RequestModal from "../components/RequestModal"; // modal for new request
import ConfirmModal from "../components/ConfirmModal"; // your reusable confirm modal

const RequestPosted = () => {
  // state for main requests
  const [requests, setRequests] = useState([]);
  const [historyRequests, setHistoryRequests] = useState([]); // separate state for history
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false); // new request modal
  const [showHistory, setShowHistory] = useState(false); // toggle main/history
  const [dismissedRequests, setDismissedRequests] = useState([]); // closed available requests

  // state for confirm modal
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmModalProps, setConfirmModalProps] = useState({
    title: "",
    description: "",
    onConfirm: () => { },
  });

  const LOCAL_STORAGE_KEY = "dismissedAvailableRequests";
  // load dismissed requests from localStorage
  useEffect(() => {
    const dismissed = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (dismissed) setDismissedRequests(JSON.parse(dismissed));
  }, []);

  // fetch main requests (active: Pending + Available)
  const fetchRequests = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("You are not logged in.");
        return;
      }

      const res = await fetch(`${process.env.REACT_APP_API_URL}/book-requests/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch requests");

      const data = await res.json();
      setRequests(data);

    } catch (err) {
      console.error(err);
      setError("Failed to fetch requests.");
    } finally {
      setLoading(false);
    }
  };


  // fetch history requests (all statuses)
  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.REACT_APP_API_URL}/book-requests/history`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch history");
      const data = await res.json();
      setHistoryRequests(data);
    } catch (err) {
      console.error(err);
      message.error("Failed to load history.");
    }
  };

  // cancel pending request with confirm modal
  const handleCancelRequest = (requestId) => {
    setConfirmModalProps({
      title: "Are you sure you want to cancel this request?",
      description: "This action cannot be undone.",
      onConfirm: async () => {
        try {
          const token = localStorage.getItem("token");
          await axios.delete(`${process.env.REACT_APP_API_URL}/book-requests/${requestId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setRequests((prev) => prev.filter((r) => r.bookRequestId !== requestId));
          message.success("Request cancelled successfully.");
        } catch (err) {
          console.error(err);
          message.error("Failed to cancel request.");
        } finally {
          setConfirmModalOpen(false);
        }
      },
    });
    setConfirmModalOpen(true);
  };

  // re-request cancelled request with confirm modal
  const handleReRequest = (requestId) => {
    setConfirmModalProps({
      title: "Are you sure you want to re-request this book?",
      description: "This will submit the request again.",
      onConfirm: async () => {
        try {
          const token = localStorage.getItem("token");
          await axios.put(
            `${process.env.REACT_APP_API_URL}/book-requests/${requestId}/rerequest`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          );
          fetchRequests(); // reload main requests
          message.success("Request re-submitted successfully.");
        } catch (err) {
          console.error(err);
          message.error("Failed to re-request.");
        } finally {
          setConfirmModalOpen(false);
        }
      },
    });
    setConfirmModalOpen(true);
  };

  // Dismiss available request and store in localStorage
  const handleDismissAvailable = (requestId) => {
    const updatedDismissed = [...dismissedRequests, requestId];
    setDismissedRequests(updatedDismissed);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedDismissed)); // Save in localStorage

    // Update requests to reflect the dismissal
    setRequests((prevRequests) =>
      prevRequests.filter((request) => request.bookRequestId !== requestId)
    );
  };

  // fetch requests on mount
  useEffect(() => {
    fetchRequests();
  }, []);

  // loading state
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-lg">Loading requests...</p>
      </div>
    );
  }

  // error state
  if (error) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center">
        <p className="text-lg text-red-500 mb-4">{error}</p>
        <button
          onClick={fetchRequests}
          className="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
        >
          Retry
        </button>
      </div>
    );
  }

  // toggle between active requests and history
  const displayedRequests = showHistory
    ? historyRequests
    : requests.filter((r) => r.status === "Pending" || r.status === "This_book_is_available_now");


  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* page header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold text-black">My Book Requests</h1>

        {/* new request button on right corner */}
        {!showHistory && (
          <button
            onClick={() => setShowPopup(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            + New Request
          </button>
        )}
      </div>

      {/* toggle history/main */}
      <button
        onClick={() => {
          if (!showHistory) fetchHistory(); // fetch history only when opening
          setShowHistory((prev) => !prev);
        }}
        className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition duration-200 mb-6"
      >
        {showHistory ? "Back to Active Requests" : "View History"}
      </button>

      {/* requests list */}
      <div className="space-y-6">
        {displayedRequests.length > 0 ? (
          displayedRequests.map((request) => (
            <div
              key={request.bookRequestId}
              className="bg-white p-4 border border-gray-300 rounded relative"
            >
              <div className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden transform hover:-translate-y-1 transition duration-300 ease-in-out">
                <div className="p-4 flex-1 flex flex-col justify-between">
                  {/* request details */}
                  <div>
                    <p className="text-sm text-gray-700">Title: {request.title}</p>
                    <p className="text-sm text-gray-700">Author: {request.author}</p>
                    <p className="text-sm text-gray-700">
                      Location: {request.location?.locationName}
                    </p>

                    {/* status badge */}
                    <div className="mt-1 flex items-center gap-2">
                      <span className="font-normal text-sm text-gray-700">Status: </span>
                      <span
                        className={`px-3 py-1 rounded
   text-white text-sm ${request.status === "Pending" ?
                            "bg-yellow-400" : request.status === "This_book_is_available_now" ?
                              "bg-green-500" : "bg-gray-500"}`}
                      >
                        {request.status === "Pending" ? "Pending" : request.status ===
                          "This_book_is_available_now" ?
                          "This book is available now" : "Cancelled"}
                      </span>



                      {/* close button for available request */}
                      {!showHistory && request.status === "This_book_is_available_now" && (
                        <button
                          onClick={() => handleDismissAvailable(request.bookRequestId)}
                          className="absolute top-2 right-2 text-black font-bold w-5 h-5 flex items-center justify-center"
                          title="Dismiss the card from main page"
                        >
                          X
                        </button>
                      )}

                    </div>
                  </div>

                  {/* action buttons */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {/* cancel pending */}
                    {request.status === "Pending" && (
                      <button
                        aria-label="Cancel request"
                        className="border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-50 transition duration-200"
                        onClick={() => handleCancelRequest(request.bookRequestId)}
                      >
                        Cancel Request
                      </button>
                    )}

                    {/* re-request cancelled */}
                    {request.status === "Cancelled" && (
                      <button
                        aria-label="Re-request"
                        className="border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-50 transition duration-200"
                        onClick={() => handleReRequest(request.bookRequestId)}
                      >
                        Re-request
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 py-10">
            {showHistory ? "No requests in history." : "No active requests. Post a new request!"}
          </p>
        )}
      </div>

      {/* new request modal */}
      {showPopup && (
        <RequestModal onClose={() => setShowPopup(false)} onRequestCreated={fetchRequests} />
      )}

      {/* reusable confirm modal */}
      <ConfirmModal
        open={confirmModalOpen}
        title={confirmModalProps.title}
        description={confirmModalProps.description}
        onConfirm={confirmModalProps.onConfirm}
        onCancel={() => setConfirmModalOpen(false)}
        okText="Yes"
        cancelText="No"
      />
    </div>
  );
};

export default RequestPosted;

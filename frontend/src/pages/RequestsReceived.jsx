import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tabs, message } from "antd";
import LendedBookCard from "../components/LendedBookCard";
import BookWantedRequestCard from "../components/BookWantedRequestCard";
import AddBookModal from "../components/AddBook";

const { TabPane } = Tabs;

const RequestsReceived = () => {
  const API_URL = process.env.REACT_APP_API_URL;

  const [borrowRequests, setBorrowRequests] = useState([]);
  const [wantedRequests, setWantedRequests] = useState([]);
  const [rejectedBorrowRequests, setRejectedBorrowRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [autofillRequest, setAutofillRequest] = useState(null);

  const errorMessages = {
    401: "Session expired. Please log in.",
    403: "You don’t have permission to view this.",
    404: "Book request not found.",
    500: "Server error. Please try again later.",
  };

  // ---------------- Fetch Data ----------------

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not logged in");
      const [borrowRes, wantedRes] = await Promise.all([ // [borrowRes, wantedRes]
        axios.get(`${API_URL}/lended-books`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${API_URL}/book-requests/received`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setBorrowRequests(
        borrowRes.data.filter((b) => b.status === "Pending")
      );

      setRejectedBorrowRequests(
        borrowRes.data.filter((b) => b.status === "Rejected")
      );

      setWantedRequests(wantedRes.data);
    } catch (err) {
      console.error(err);
      message.error("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchRequests();
  }, []);

  // ---------------- Handlers ----------------

  const handleAccept = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_URL}/lended-books/${id}/accept`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      message.success("Request accepted");
      fetchRequests();
    } catch (err) {
      message.error("Failed to accept request");
    }
  };

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_URL}/lended-books/${id}/reject`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      message.success("Request rejected");
      fetchRequests();
    } catch (err) {
      message.error("Failed to reject request");
    }
  };

  // const handleRespond = () => {
  //   message.success("The requester has been notified!");
  // };

  // ---------------- Handle Respond / Autofill ----------------
  const handleRespond = async (requestId) => {
    if (!requestId) {
      message.error("Invalid request");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      message.error("Please log in to continue");
      return;
    }

    try {
      const res = await axios.get(`${API_URL}/book-requests/${requestId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { title, author, location } = res.data;
      const locationId = location?.locationId;
      // Pass autofilled request data to modal
      setAutofillRequest({
        requestId,  // Needed to update status later
        title,
        author,
        locationId,
      });

      // Open modal
      setModalOpen(true);
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.status && errorMessages[err.response.status]
          ? errorMessages[err.response.status]
          : "Network error. Check your connection.";
      message.error(msg);
    }
  };



  const handleSuccess = () => {
    fetchRequests();
  };

  // ---------------- Render ----------------

  return (
    <div className="p-2">
      <h1 className="text-2xl font-semibold mb-4">Requests Received</h1>

      <Tabs defaultActiveKey="borrow" type="card">
        {/* Borrow Requests */}
        <TabPane tab={`Borrow Requests (${borrowRequests.length})`} key="borrow">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : borrowRequests.length === 0 ? (
            <p className="text-gray-500 text-center">No pending borrow requests</p>
          ) : (
            <div className="space-y-4">
              {borrowRequests.map((book) => (
                <LendedBookCard
                  key={book.requestId}
                  {...book}
                  pricePerWeek={book.feePerWeek}
                  onAccept={() => handleAccept(book.requestId)}
                  onReject={() => handleReject(book.requestId)}
                />
              ))}
            </div>
          )}
        </TabPane>

        <TabPane
          tab={`Rejected Borrow Requests (${rejectedBorrowRequests.length})`}
          key="rejected"
        >
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : rejectedBorrowRequests.length === 0 ? (
            <p className="text-gray-500 text-center">
              No rejected borrow requests
            </p>
          ) : (
            <div className="space-y-4">
              {rejectedBorrowRequests.map((book) => (
                <LendedBookCard
                  key={book.requestId}
                  {...book}
                  pricePerWeek={book.feePerWeek}
                />
              ))}
            </div>
          )}
        </TabPane>


        {/* Book Wanted Requests */}
        <TabPane tab={`Book Wanted (${wantedRequests.length})`} key="wanted">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : wantedRequests.length === 0 ? (
            <p className="text-gray-500 text-center">
              No book wanted requests
            </p>
          ) : (
            <div className="space-y-4">
              {wantedRequests.map((req) => (
                <BookWantedRequestCard
                  key={req.requestId}
                  bookRequestId={req.requestId}
                  title={req.title}
                  requester={req.requesterName}
                  location={req.locationName}
                  author={req.author}
                  createdDate={req.createdAt}
                  onRespond={() => handleRespond(req.requestId)}
                />
              ))}
            </div>
          )}
        </TabPane>
      </Tabs>
      <AddBookModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleSuccess}
        autofillRequest={autofillRequest} // Pass autofill request
      />
    </div>
  );
};

export default RequestsReceived;

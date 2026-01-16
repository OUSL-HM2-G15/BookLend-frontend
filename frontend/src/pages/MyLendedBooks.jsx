import React, { useEffect, useState } from "react";
import axios from "axios";
import LendedBookCard from "../components/LendedBookCard";
import { message, Modal } from "antd";

const MyLendedBooks = () => {
  const [lendedBooks, setLendedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBorrower, setSelectedBorrower] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL;

  // Function to fetch lended books
  const fetchLendedBooks = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token"); // JWT token
      const response = await axios.get(`${API_URL}/lended-books`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLendedBooks(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch lended books");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLendedBooks();
  }, []);

      const handleMarkReturned = async (id) => {
        try {
          const token = localStorage.getItem("token");
          await axios.put(
            `${API_URL}/lended-books/${id}/return`,
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          fetchLendedBooks(); // Refresh list
        } catch (err) {
          console.error(err);
          message.error(err.response?.data || "Failed to mark as returned");
        }
      };

      const handleViewDetails = async (book) => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(`${API_URL}/lended-books/${book.requestId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setSelectedBorrower(response.data.borrower);
          setIsModalOpen(true);
          console.log("Borrow Request Details:", response.data);
        } catch (err) {
          console.error(err);
          message.error(err.response?.data || "Failed to get details");
        }
      };

  // ---------------- Render ----------------

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  const filteredLendedBooks = lendedBooks.filter(
    (book) => book.status === "Accepted" || book.status === "Returned"
  );

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          My Lended Books
        </h1>
        <p className="text-sm text-gray-500">
          Manage books you’ve lended to other users
        </p>
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {filteredLendedBooks.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            No active lended books.
          </div>
        ) : (
          filteredLendedBooks.map((book) => (
            <LendedBookCard
              key={book.requestId}
              imageUrl={book.imageUrl}
              title={book.title}
              author={book.author}
              pricePerWeek={book.feePerWeek}
              borrowerName={book.borrowerName}
              borrowerLocation={book.borrowerLocation}
              requestDate={book.requestDate?.split("T")[0]}
              acceptedDate={book.acceptedDate?.split("T")[0]}
              returnedDate={book.returnedDate?.split("T")[0]}
              status={book.status}
              acceptDisabled={book.acceptDisabled}
              disableReason={book.disableReason}
              onViewDetails={() => handleViewDetails(book)}
              onMarkReturned={() => handleMarkReturned(book.requestId)}
            />
          ))
        )}
      </div>

      {/* Borrower Details Modal */}
      <Modal
        title="Borrower Details"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        {selectedBorrower ? (
          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-medium">Name:</span>{" "}
              {selectedBorrower.fullName}
            </p>
            <p>
              <span className="font-medium">Mobile Number:</span>{" "}
              {selectedBorrower.contactNo || "N/A"}
            </p>
            {selectedBorrower.whatsappNo && ( // whatsappNo is optional
              <p>
                <span className="font-medium">WhatsApp Number:</span>{" "}
                {selectedBorrower.whatsappNo || "N/A"}
              </p>
            )}
            <p>
              <span className="font-medium">Email:</span>{" "}
              {selectedBorrower.email || "N/A"}
            </p>
            <p>
              <span className="font-medium">Location:</span>{" "}
              {selectedBorrower.location || "N/A"}
            </p>
          </div>
        ) : (
          <p className="text-gray-500">No borrower details available.</p>
        )}
      </Modal>
      </div>
  );
};

export default MyLendedBooks;

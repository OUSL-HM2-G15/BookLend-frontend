import React, { useEffect, useState } from "react";
import axios from "axios";
import MyBookCard from "../components/MyBookCard";
import { getToken } from "../utils/authToken";

const MyBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL;

  const handleEdit = (book) => {
    // Logic to handle editing the book
    console.log("Edit book:", book);
  }

  // Toggle book status between "Available" and "Unavailable"
  const handleToggleStatus = async (bookId, newStatus) => {
    try {
      await axios.put(
        `${API_URL}/books/${bookId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      // Update the book status in the UI
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === bookId ? { ...book, status: newStatus } : book
        )
      );
    } catch (err) {
      console.error("Failed to update book status:", err);
    }
  };

  useEffect(() => {
    const fetchMyBooks = async () => {
      try {
        const res = await axios.get(`${API_URL}/books/me`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        setBooks(res.data);
      } catch (err) {
        console.error("Failed to fetch books:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyBooks();
  }, []);

  if (loading) return <p>Loading your books...</p>;

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Books</h2>

      {books.length === 0 ? (
        <p>No books posted yet.</p>
      ) : (
        <ul className="space-y-3">
          {books.map((book) => (
            <MyBookCard
               key={book.id}
               book={book}
               onEdit={handleEdit}
               onToggleStatus={handleToggleStatus}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBooks;

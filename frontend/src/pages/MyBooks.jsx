// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const MyBooks = ({ user }) => {
  // const [books, setBooks] = useState([]);

  // useEffect(() => {
  //   const fetchMyBooks = async () => {
  //     try {
  //       const res = await axios.get(`http://localhost:5000/api/books/user/${user.id}`, {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       });
  //       setBooks(res.data);
  //     } catch (err) {
  //       console.error("Failed to fetch books:", err);
  //     }
  //   };
  //   fetchMyBooks();
  // }, [user.id]);


  const MyBooks = () => { // delete this line
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Books</h2>
      {/* {books.length === 0 ? (
        <p>No books posted yet.</p>
      ) : (
        <ul className="space-y-3">
          {books.map((book) => (
            <li
              key={book.id}
              className="p-4 border rounded-md shadow-sm hover:bg-gray-50 transition"
            >
              <h3 className="font-semibold text-lg">{book.title}</h3>
              <p className="text-gray-600">{book.author}</p>
            </li>
          ))}
        </ul>
      )} */}
    </div>
  );
};

export default MyBooks;

import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../components/BookCard";
import { message } from "antd";
// import RequestBook from "../components/RequestBook";


function Explore() {
  // Books data states
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);

  // Selected filters
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
 
  // Request Book Popup state
  // const [showRequestPopup, setShowRequestPopup] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL;
  
 // Fetch books, locations, and categories on component mount
  useEffect(() => {
  const fetchData = async () => {
    try {
      const booksRes = await axios.get(`${API_URL}/books/public`);
      const locationsRes = await axios.get(`${API_URL}/locations`);
      const categoriesRes = await axios.get(`${API_URL}/categories`);

      setBooks(booksRes.data);
      setFilteredBooks(booksRes.data);
      setLocations(locationsRes.data);
      setCategories(categoriesRes.data);
    } catch (err) {
      message.error({
        content: "Failed to load data. Please try again!",
        duration: 3,
      });
    }
  };

  fetchData();
}, []);

  // Handle search and filter
  const handleSearch = () => {
    let results = books;

    if (searchQuery.trim() !== "") {
      results = results.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (book.author &&
            book.author.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedCategory !== "") {
      results = results.filter(
        // ? means optional chaining to avoid errors if category is undefined
        (book) => book.category?.categoryName === selectedCategory 
      );
    }

    if (selectedLocation !== "") {
      results = results.filter(
        (book) => book.availableLocation?.locationName === selectedLocation
      );
    }

    setFilteredBooks(results);
  };

  return (
    <div className="p-1">

      {/* ---------- Search + Filters ---------- */}
      <div className="p-1 flex flex-col md:flex-row gap-4">

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchQuery}
          // Update search query state on input change
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/3 p-2 border border-gray-300 rounded-lg"
        />

        {/* Category Filter */}
        <select
          value={selectedCategory}
          // Update selected category state on change
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full md:w-1/4 p-2 border border-gray-300 rounded-lg"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.categoryId} value={cat.categoryName}>
              {cat.categoryName}
            </option>
          ))}
        </select>

        {/* Location Filter */}
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="w-full md:w-1/4 p-2 border border-gray-300 rounded-lg"
        >
          <option value="">All Locations</option>
          {locations.map((loc) => (
            <option key={loc.locationId} value={loc.locationName}>
              {loc.locationName}
            </option>
          ))}
        </select>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="w-full md:w-1/6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          Search
        </button>
      </div>

      {/* ---------- No Books Found Message + Post Book Request Button ---------- */}
      {filteredBooks.length === 0 && (
        <div className="mt-20 flex flex-col items-center text-center">
          <p className="text-lg font-semibold text-gray-400 mb-4">
            Can't find any books matching your search.
          </p>
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow-md"
            // onClick={() => setShowRequestPopup(true)}
            >
            Post Book Request
          </button>
        </div>
      )}

      {/* ---------- Request Book Popup ---------- */}
      {/* {showRequestPopup && (
        <RequestBook onClose={() => setShowRequestPopup(false)} />
      )} */}

      {/* ---------- Book Grid ---------- */}
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <BookCard key={book.bookId} book={book} />
        ))}
      </div>
    </div>
  );
}

export default Explore;

import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "./BookCard";
import { message } from "antd";

function PublicExplore({ isPublic = false, onLoginRequired, onOpenDetail, onOpenRequest }) {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const API_URL = process.env.REACT_APP_API_URL;

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
        message.error("Failed to load books");
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    let results = books;

    if (searchQuery) {
      results = results.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      results = results.filter(
        (book) => book.category?.categoryName === selectedCategory
      );
    }

    if (selectedLocation) {
      results = results.filter(
        (book) => book.availableLocation?.locationName === selectedLocation
      );
    }

    setFilteredBooks(results);
  };

  return (
    <div className="p-2 ">

      {/* Search Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center">
        <input
          type="text"
          placeholder="Search books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded-lg w-full md:w-1/3"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded-lg w-full md:w-1/4"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.categoryId} value={cat.categoryName}>
              {cat.categoryName}
            </option>
          ))}
        </select>

        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="p-2 border rounded-lg w-full md:w-1/4"
        >
          <option value="">All Locations</option>
          {locations.map((loc) => (
            <option key={loc.locationId} value={loc.locationName}>
              {loc.locationName}
            </option>
          ))}
        </select>

        <button
          onClick={handleSearch}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg"
        >
          Search
        </button>
      </div>

        <div className="min-h-[60vh] flex justify-center">
        {filteredBooks.length === 0 ? (
            <div className="min-h-[50vh] flex flex-col items-center justify-center text-center">
            {isPublic ? (
                // Public/Home view
                <>
                <p className="text-xl font-semibold mb-4 text-gray-500">
                    No books available right now
                </p>
                <p className="text-sm text-gray-400">
                    Please login to request a book or check back later.
                </p>
                </>
            ) : (
                // Dashboard/logged-in view
                <>
                <p className="text-lg font-semibold text-gray-400 mb-4">
                    Can't find any books matching your search.
                </p>
                <button
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow-md"
                    onClick={onOpenRequest}
                >
                    Post Book Request
                </button>
                </>
            )}
            </div>
        ) : (
            // Books exist - show grid
            <div 
              className={`grid grid-cols-1 sm:grid-cols-2 ${
                isPublic ? "md:grid-cols-5" : "md:grid-cols-4"
              } gap-6`}
            >
            {filteredBooks.map((book) => (
                <BookCard
                key={book.bookId}
                book={book}
                isPublic={isPublic}
                onLoginRequired={onLoginRequired}
                onOpenDetail={onOpenDetail}
                onOpenRequest={onOpenRequest}
                />
            ))}
            </div>
        )}
        </div>
    </div>
  );
}

export default PublicExplore;

// This is the MyBookDetails.jsx file for book owners to view and edit their book details.

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getToken } from "../utils/authToken";
import { message } from "antd";
import ConfirmModal from "../components/ConfirmModal";

const MyBookDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [originalBook, setOriginalBook] = useState(null); // for cancel
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editable, setEditable] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${API_URL}/books/me/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((res) => {
        setBook(res.data);
        setOriginalBook(res.data); // store original for cancel
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        if (err.response?.status === 401) {
          message.error("You are not authorized. Please log in.");
          window.location.href = "/login";
        }
      });
   try {
    axios.get(`${API_URL}/locations`).then((res) => setLocations(res.data));
    axios.get(`${API_URL}/categories`).then((res) => setCategories(res.data));
   } catch (err) {
    console.error("Error fetching dropdown data:", err);
    message.error("Failed to load dropdown data.");
   }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setSaving(true);
    const payload = {
      title: book.title,
      author: book.author,
      feePerWeek: Number(book.feePerWeek),
      status: book.status,
      imageUrl: book.imageUrl,
      isbn: book.isbn,
      publishedYear: book.publishedYear,
      description: book.description,
      locationId: book.locationId,
      categoryId: book.categoryId,
    };
    console.log("Payload for update:", payload);

    axios
      .put(`${API_URL}/books/me/${id}`, payload, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((res) => {
        setBook(res.data);
        setOriginalBook(res.data);
        setEditable(false);
        setSaving(false);
        message.success("Book updated successfully!");
      })
      .catch((err) => {
        setSaving(false);
        console.error(err);
        message.error("Error updating book.");
      });
  };

  const handleCancel = () => {
    setBook(originalBook);
    setEditable(false);
  };

  const handleDelete = () => {
      axios
        .delete(`${API_URL}/books/me/${id}`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        })
        .then(() => {
          message.success("Book deleted successfully!");
          navigate("/my-books");
        })
        .catch((err) => {
          console.error(err);
          message.error("Error deleting book.");
        })
        .finally(() => {
        setOpenDeleteModal(false);
      });
  };

  if (loading || !book) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
    {/* Back Button */}
    <button
      onClick={() => navigate(-1)}
      className="mb-6 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium 
                text-gray-700 bg-gray-100 rounded-lg 
                hover:bg-blue-100 hover:text-blue-600 transition"
    >
      ← Back
    </button>
    <div className="max-w-6xl mx-auto p-10 bg-white shadow-lg rounded-xl">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left side: image */}
        <div className="flex flex-col w-full md:w-1/3 gap-4">
          <div className="rounded-lg overflow-hidden h-full">
            <img
              src={book.imageUrl || "/placeholder-book.png"}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right side: details */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Title */}
          <div>
            <label className="font-semibold text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={book.title}
              onChange={handleChange}
              disabled={!editable}
              className={`w-full border rounded-lg p-2 mt-1 ${
                editable ? "bg-white" : "bg-gray-100"
              }`}
            />
          </div>

          {/* Author */}
          <div>
            <label className="font-semibold text-gray-700">Author</label>
            <input
              type="text"
              name="author"
              value={book.author}
              onChange={handleChange}
              disabled={!editable}
              className={`w-full border rounded-lg p-2 mt-1 ${
                editable ? "bg-white" : "bg-gray-100"
              }`}
            />
          </div>

          {/* Location & Category */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="font-semibold text-gray-700">Location</label>
              <select
                name="locationId"
                value={book.locationId}
                onChange={handleChange}
                disabled={!editable}
                className={`w-full border rounded-lg p-2 mt-1 ${
                  editable ? "bg-white" : "bg-gray-100"
                }`}
              >
                {locations.map((loc) => (
                  <option key={loc.locationId} value={loc.locationId}>
                    {loc.locationName}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="font-semibold text-gray-700">Category</label>
              <select
                name="categoryId"
                value={book.categoryId}
                onChange={handleChange}
                disabled={!editable}
                className={`w-full border rounded-lg p-2 mt-1 ${
                  editable ? "bg-white" : "bg-gray-100"
                }`}
              >
                {categories.map((cat) => (
                  <option key={cat.categoryId} value={cat.categoryId}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Fee */}
          <div>
            <label className="font-semibold text-gray-700">Fee per week</label>
            <input
              type="number"
              name="feePerWeek"
              value={book.feePerWeek}
              onChange={handleChange}
              disabled={!editable}
              className={`w-full border rounded-lg p-2 mt-1 ${
                editable ? "bg-white" : "bg-gray-100"
              }`}
            />
          </div>

          {/* Status */}
          <div>
            <label className="font-semibold text-gray-700">Status</label>
            <select
              name="status"
              value={book.status}
              onChange={handleChange}
              disabled={!editable}
              className={`w-full border rounded-lg p-2 mt-1 ${
                editable ? "bg-white" : "bg-gray-100"
              }`}
            >
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>

          {/* ISBN */}
          <div>
            <label className="font-semibold text-gray-700">ISBN</label>
            <input
              type="text"
              name="isbn"
              value={book.isbn}
              onChange={handleChange}
              disabled={!editable}
              className={`w-full border rounded-lg p-2 mt-1 ${
                editable ? "bg-white" : "bg-gray-100"
              }`}
            />
          </div>

          {/* Published Year */}
          <div>
            <label className="font-semibold text-gray-700">Published Year</label>
            <input
              type="number"
              name="publishedYear"
              value={book.publishedYear}
              onChange={handleChange}
              disabled={!editable}
              className={`w-full border rounded-lg p-2 mt-1 ${
                editable ? "bg-white" : "bg-gray-100"
              }`}
            />
          </div>

          {/* Created At */}
          <div>
            <label className="font-semibold text-gray-700">Created Date</label>
            <input
              type="text"
              value={new Date(book.createdAt).toLocaleString().split(",")[0]} // show only date
              disabled
              className="w-full border rounded-lg p-2 mt-1 bg-gray-100"
            />
          </div>
        </div>
      </div>

      {/* Description */}
        <div className="mt-6  w-auto">
            <label className="font-semibold text-gray-700 mb-2">Description</label>
            <textarea
            type="textArea"
            name="description"
            value={book.description}
            onChange={handleChange}
            disabled={!editable}
            className={`w-full border rounded-lg p-2 mt-1 ${
              editable ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-4">
          {!editable ? ( 
            <button
              onClick={() => setEditable(true)}
              className="px-5 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
            >
              Edit
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                {saving ? "Saving..." : "Save"}
              </button>
              <button
                onClick={handleCancel}
                className="px-5 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </>
          )}
              {/* Delete button */}
              <button
                className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                onClick={() => setOpenDeleteModal(true)}>
                Delete Book
              </button>

              {/* Confirm Modal */}
              <ConfirmModal
                open={openDeleteModal}
                title="Delete Book"
                description="Are you sure you want to delete this book? This action cannot be undone."
                okText="Delete"
                cancelText="Cancel"
                onConfirm={handleDelete}
                onCancel={() => setOpenDeleteModal(false)}
              />
        </div>
    </div>
    </div>
  );
};

export default MyBookDetailPage;

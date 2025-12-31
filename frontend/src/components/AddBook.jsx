import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, message, Spin } from "antd";
import { IKUpload } from "imagekitio-react";

export default function AddBookModal({ open, onClose, onSuccess }) {

  const API_URL = process.env.REACT_APP_API_URL;

  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    description: "",
    category_id: "",
    fee_per_week: "",
    status: "Available",
    available_location_id: "",
    imageFile: null,
    image_url: "",
    isbn: "",
    published_year: "",
  });

  // Load categories and locations when modal opens
  useEffect(() => {
    if (!open) return;

    const fetchData = async () => {
      try {
        const categoriesRes = await axios.get(`${API_URL}/categories`);
        const locationsRes = await axios.get(`${API_URL}/locations`);

        setCategories(categoriesRes.data);
        setLocations(locationsRes.data);

      } catch (err) {
        message.error("Failed to load dropdown data.");
      }
    };

    fetchData();
  }, [open]);

  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };
  
  // A function to handle the file selection specifically
  const handleFileSelect = (file) => { // file is a File object
    //  updating the bookData, storing the File object in the 'imageFile' property
    setBookData(prevData => ({  // prevData to ensure keep other properties intact
        ...prevData, 
        imageFile: file 
    }));
  };

  const handleAddBook = async () => {
  // Frontend validation
  if (!bookData.title.trim()) 
    return message.error("Please enter the book title.");

  if (!bookData.author.trim()) 
    return message.error("Please enter the author name.");
  
  if (!bookData.description.trim()) 
    return message.error("Please enter the book description.");
  
  if (!bookData.category_id) 
    return message.error("Please select a category.");
  
  if (!bookData.available_location_id) 
    return message.error("Please select a location.");
  
  if (!bookData.fee_per_week || bookData.fee_per_week < 0) 
    return message.error("Please enter a valid fee per week.");

    // validation based on the final URL
    if (imageUploading) {
        return message.error("Please wait for the image upload to complete.");
    }
    if (!bookData.image_url) {
        return message.error("Image is missing. Please select and upload an image.");
    }
  
  if (!bookData.isbn.trim() || bookData.isbn.length > 17 ) 
    return message.error("Please provide the ISBN in the correct format.");
  
  if (
    !bookData.published_year || 
    bookData.published_year < 1000 || 
    bookData.published_year > new Date().getFullYear() || 
    bookData.published_year.toString().length !== 4) 
    return message.error("Please enter a valid published year with 4 digits.");
  
  setLoading(true);

  try {
    // Prepare payload - the data to be sent to the backend API
    const payload = {
      title: bookData.title,
      author: bookData.author,
      description: bookData.description,
      category_id: bookData.category_id,
      fee_per_week: bookData.fee_per_week,
      status: bookData.status,
      available_location_id: bookData.available_location_id,
      isbn: bookData.isbn,
      published_year: bookData.published_year,
      image_url: bookData.image_url // send URL to backend
    };

    // Send to backend
    await axios.post(`${API_URL}/books`, payload, {
    });
    
    message.success("Book added successfully!");

    // Reset form
    setBookData({
      title: "",
      author: "",
      description: "",
      category_id: "",
      fee_per_week: "",
      status: "Available",
      available_location_id: "",
      imageFile: null,
      image_url: "",
      isbn: "",
      published_year: "",
    });

    onSuccess(); // Notify parent (AddBook modal) to refresh list
    onClose(); // Close modal

  } catch (err) {
    console.error(err);
    message.error(err.response?.data?.message || "Failed to add book.");
  }
  setLoading(false);
};

  return (
    <Modal
      title={
        <div className="text-center">
             <h2 className="text-xl font-semibold">Add a New Book</h2>
             <p className="text-gray-500 text-sm mt-1">
             Share your books with the community.</p>
        </div>
      }
      open={open}
      onCancel={onClose}
      onOk={handleAddBook}
      okText="Add Book"
      confirmLoading={loading}
      okButtonProps={{ disabled: loading || imageUploading }}  // 'disabled' property for the Add Book button while loading or image uploading
      width={900}
      centered
      maskClosable={false}
      destroyOnClose={true}
      bodyStyle={{ padding: "20px" }}
      className="addbook-modal"
    >
        {/* FORM FIELDS */}
        <div className="max-h-[70vh] overflow-y-auto pr-2"> 

          {/* Title + Author */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={bookData.title}
                onChange={handleChange}
                maxLength={150}
                className="w-full border rounded-lg px-4 py-2"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Author <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="author"
                value={bookData.author}
                onChange={handleChange}
                maxLength={100}
                className="w-full border rounded-lg px-4 py-2"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block mt-2 mb-1 font-medium text-gray-700">
              Description <span className="text-red-500">*</span>
              </label>
            <textarea
              name="description"
              value={bookData.description}
              onChange={handleChange}
              rows={3}
              maxLength={800}
              className="w-full border rounded-lg px-4 py-2 "
              required
            ></textarea>
          </div>

          {/* Category + Location */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category_id"
                value={bookData.category_id}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option value={cat.categoryId}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Location <span className="text-red-500">*</span>
              </label>
              <select
                name="available_location_id"
                value={bookData.available_location_id}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
                required
              >
                <option value="">Select Location</option>
                {locations.map((loc) => (
                  <option value={loc.locationId}>
                    {loc.locationName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Fee + Status */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block mt-2 mb-1 font-medium text-gray-700">
                Fee Per Week (Rs.) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="fee_per_week"
                value={bookData.fee_per_week}
                min={0}
                max={1000} 
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
                required
              />
            </div>

            <div>
              <label className="block mt-2 mb-1 font-medium text-gray-700">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                name="status"
                value={bookData.status}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
                required
              >
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>
          </div>

          {/* Image + ISBN */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block mt-2 mb-1 font-medium text-gray-700">
               Upload Book Image <span className="text-red-500">*</span>
                </label>
                 <IKUpload
                   onInput={handleFileSelect}
                   accept="image/jpeg, image/png"
                   beforeUpload={(files) => {
                      const file = files[0]; // Get the first selected file
                      if (file.size > 5 * 1024 * 1024) { // 5MB limit
                          message.error("Image size must be less than 5MB.");
                          return false; // Reject upload
                       }
                       // If it passes, the upload proceeds
                          return true; 
                   }}
                   fileName={bookData.imageFile?.name || "book_image"}
                   folder="/books"
                   onError={() => message.error("Image upload failed")}
                   onUploadStart={() => setImageUploading(true)}
                   onSuccess={(res) => {
                     setBookData(prevData => ({ ...prevData, image_url: res.url})); // Adding image_url to bookData state
                     setImageUploading(false);
                     message.success("Image uploaded successfully!");
                     }}
                 />
            {imageUploading && (  // Show uploading indicator
              <div className="mt-2">
                <Spin size="small" /> Uploading...
              </div>
            )}
            </div>
            <div>
              <label className="block mt-2 mb-1 font-medium text-gray-700">
                ISBN <span className="text-red-500">*</span>
                </label>
              <input
                type="text"
                name="isbn"
                value={bookData.isbn}
                onChange={handleChange}
                maxLength={17}
                pattern="[0-9\-]{10,17}" // eg: 978-3-16-148410-0
                title="ISBN should be 10 to 17 characters long and can include digits and hyphens." // show on hover
                className="w-full border rounded-lg px-4 py-2"
                required
              />
            </div>
          </div>

          {/* Published Year */}
          <div className="w-1/2">
            <label className="block mt-2 mb-1 font-medium text-gray-700">
              Published Year <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="published_year"
              value={bookData.published_year}
              onChange={handleChange}
              min={1000}
              max={new Date().getFullYear()}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>
        </div>
    </Modal>
  );
}

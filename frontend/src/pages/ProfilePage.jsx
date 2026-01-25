import React, { useEffect, useState } from "react";
import axios from "axios";
import { IKUpload } from "imagekitio-react";

const API_URL = process.env.REACT_APP_API_URL;

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [locations, setLocations] = useState([]);
  const [form, setForm] = useState({
    username: "",
    fullName: "",
    email: "",
    contactNumber: "",
    whatsappNumber: "",
    location: "",
    profilePic: "",
  });

  // Fetch user data and locations
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, locRes] = await Promise.all([
          axios.get(`${API_URL}/api/users/me`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }),
          axios.get(`${API_URL}/api/locations`),
        ]);

        setUser(userRes.data);
        setForm({
          username: userRes.data.username || "",
          fullName: userRes.data.fullName || "",
          email: userRes.data.email || "",
          contactNumber: userRes.data.contactNumber || "",
          whatsappNumber: userRes.data.whatsappNumber || "",
          location: userRes.data.location || "",
          profilePic: userRes.data.profilePic || "",
        });

        setLocations(locRes.data || []);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUploadSuccess = (res) => {
    setForm({ ...form, profilePic: res.url });
  };

  const handleSave = async () => {
    try {
      await axios.put(`${API_URL}/api/users/me`, form, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Profile updated successfully");
    } catch (err) {
      console.error("Profile update failed:", err);
      alert("Failed to update profile");
    }
  };

  const handleCancel = () => {
    if (!user) return;
    setForm({
      username: user.username || "",
      fullName: user.fullName || "",
      email: user.email || "",
      contactNumber: user.contactNumber || "",
      whatsappNumber: user.whatsappNumber || "",
      location: user.location || "",
      profilePic: user.profilePic || "",
    });
  };

  return (
    <div className="flex justify-center px-4 md:px-0">
      <div className="bg-white rounded-[32px] shadow-lg p-8 w-full max-w-[1006px] flex flex-col items-center">

        {/* Change Photo */}
        <div className="flex flex-col items-center mb-6 mt-4">
          {form.profilePic && (
            <img
              src={form.profilePic}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
          )}

          <p className="text-gray-500 text-sm mt-2 text-center">
            Update your personal information and preferences.
          </p>

          <IKUpload
            fileName="profile.jpg"
            onSuccess={handleUploadSuccess}
            onError={(err) => console.error("Upload error:", err)}
          />

          
        </div>

        {/* Form Fields */}
        <div className="w-full max-w-[600px] space-y-4">
          {/* Username */}
          <div className="flex items-center space-x-4">
            <label className="w-36 font-bold text-sm">Username:</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Your Username"
              className="flex-1 max-w-full border border-gray-300 rounded-xl p-3 text-sm"
            />
          </div>

          {/* Full Name */}
          <div className="flex items-center space-x-4">
            <label className="w-36 font-bold text-sm">Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Your Full Name"
              className="flex-1 max-w-full border border-gray-300 rounded-xl p-3 text-sm"
            />
          </div>

          {/* Email */}
          <div className="flex items-center space-x-4">
            <label className="w-36 font-bold text-sm">Email:</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              className="flex-1 max-w-full border border-gray-300 rounded-xl p-3 text-sm"
            />
          </div>

          {/* Location (dropdown) */}
          <div className="flex items-center space-x-4">
            <label className="w-36 font-bold text-sm">Location:</label>
            <select
              name="location"
              value={form.location}
              onChange={handleChange}
              className="flex-1 max-w-full border border-gray-300 rounded-xl p-3 text-sm"
            >
              <option value="">Select location</option>
              {locations.map((loc) => (
                <option key={loc.id || loc} value={loc.name || loc}>
                  {loc.name || loc}
                </option>
              ))}
            </select>
          </div>

          {/* Phone Number */}
          <div className="flex items-center space-x-4">
            <label className="w-36 font-bold text-sm">Phone Number:</label>
            <input
              type="text"
              name="contactNumber"
              value={form.contactNumber}
              onChange={handleChange}
              placeholder="+94 XXX XXX XXX"
              className="flex-1 max-w-full border border-gray-300 rounded-xl p-3 text-sm"
            />
          </div>

          {/* WhatsApp */}
          <div className="flex items-center space-x-4">
            <label className="w-36 font-bold text-sm">WhatsApp:</label>
            <input
              type="text"
              name="whatsappNumber"
              value={form.whatsappNumber}
              onChange={handleChange}
              placeholder="+94 XXX XXX XXX"
              className="flex-1 max-w-full border border-gray-300 rounded-xl p-3 text-sm"
            />
          </div>
        </div>

        {/* Save / Cancel buttons */}
        <div className="flex justify-center space-x-4 mt-8">
          <button
            onClick={handleCancel}
            className="bg-gray-500 text-white px-6 py-3 rounded-2xl text-sm font-semibold hover:bg-gray-600"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-8 py-3 rounded-2xl text-sm font-semibold hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
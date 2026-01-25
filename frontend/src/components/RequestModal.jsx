import React, { useState, useEffect, useCallback } from "react";
import { notification } from "antd";
import axios from "axios";

const RequestModal = ({ onClose, onRequestCreated }) => {
    const [bookTitle, setBookTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [location, setLocation] = useState("");
    const [locations, setLocations] = useState([]);
    const [isVisible, setIsVisible] = useState(false);

    const API_URL = process.env.REACT_APP_API_URL;

    const handleClose = useCallback(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    }, [onClose]);

    useEffect(() => {
        setIsVisible(true);

        const fetchLocations = async () => {
            try {
                const response = await axios.get(`${API_URL}/locations`);  
                setLocations(response.data);
            } catch (error) {
                console.error("Error fetching locations:", error);
            }
        };
        fetchLocations();

        const handleEsc = (e) => {
            if (e.key === "Escape") handleClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if all fields are filled
        if (!bookTitle || !author || !location) {
            notification.error({
                message: "Error",
                description: "Please fill all fields before submitting.",
                placement: "topRight",
                duration: 3,
            });
            return;
        }

        try {
            const token = localStorage.getItem("token");
            await axios.post(
                `${API_URL}/book-requests`,
                {
                    title: bookTitle,
                    author,
                    locationId: Number(location),
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            notification.success({
                message: "Success",
                description: `Your request for "${bookTitle}" by "${author}" has been submitted!`,
                placement: "topRight",
                duration: 3,
            });

            onRequestCreated?.(); // Trigger fetchRequests to reload the book requests
            handleClose();
        } catch (error) {
            console.error("Error submitting request:", error);
            notification.error({
                message: "Error",
                description: "There was an error submitting your request.",
                placement: "topRight",
                duration: 3,
            });
        }
    };


    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            onClick={handleClose}
        >
            <div
                className={`relative bg-white w-full max-w-md rounded-lg shadow-lg p-6 transform transition-all duration-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={handleClose}
                    className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl"
                >
                    ×
                </button>

                <h2 className="text-2xl font-bold text-center text-gray-900">
                    Request a Book
                </h2>
                <p className="text-center text-gray-500 mb-6">
                    Can't find it? Let the community know!
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Book Title
                        </label>
                        <input
                            type="text"
                            placeholder="e.g., Hand Book Of The Maiden"
                            value={bookTitle}
                            onChange={(e) => setBookTitle(e.target.value)}
                            className="w-full border border-blue-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Author
                        </label>
                        <input
                            type="text"
                            placeholder="e.g., Douglas"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="w-full border border-blue-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Location
                        </label>
                        <select
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full border border-blue-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select a location</option>
                            {locations.map((loc) => (
                                <option key={loc.locationId} value={loc.locationId}>
                                    {loc.locationName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Submit Request
                    </button>
                </form>
            </div>
        </div>

    );
};


export default RequestModal;

import React, { useState, useEffect } from "react";
import { notification } from "antd"; // AntD notifications
import { LOCATIONS } from "../utils/locations"; // move locations to utils

const RequestModal = ({ onClose }) => {
    const [bookTitle, setBookTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [location, setLocation] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);

        const handleEsc = (e) => {
            if (e.key === "Escape") handleClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate if all fields are filled
        if (!bookTitle || !author || !location) {
            notification.error({
                message: "Error",
                description: "Please fill all fields before submitting.",
                placement: "topRight",
                duration: 3,
            });
            return;
        }

        // Replace console.log with notification
        notification.success({
            message: "Success",
            description: `Your request for the book "${bookTitle}" by "${author}" has been submitted successfully!`,
            placement: "topRight",
            duration: 3,
        });

        handleClose();
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
                {/* Close button */}
                <button
                    onClick={handleClose}
                    className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl"
                >
                    ×
                </button>

                {/* Header */}
                <h2 className="text-2xl font-bold text-center text-gray-900">
                    Request a Book
                </h2>
                <p className="text-center text-gray-500 mb-6">
                    Can't find what you're looking for? Let the community know!
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Book Title */}
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

                    {/* Author */}
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

                    {/* Location */}
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
                            {LOCATIONS.map((loc, index) => (
                                <option key={index} value={loc}>
                                    {loc}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Submit Button */}
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

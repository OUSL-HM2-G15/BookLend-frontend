import React, { useState } from 'react';
import zxcvbn from 'zxcvbn';
import AlertMessage from './AlertMessage'; // Import the AlertMessage component

const locations = [
    'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya',
    'Galle', 'Matara', 'Hambantota', 'Jaffna', 'Kilinochchi', 'Mannar',
    'Vavuniya', 'Mullaitivu', 'Batticaloa', 'Ampara', 'Trincomalee',
    'Kurunegala', 'Puttalam', 'Anuradhapura', 'Polonnaruwa', 'Badulla',
    'Monaragala', 'Ratnapura', 'Kegalle'
];


const RegisterModal = ({ isOpen, onClose, onOpenLogin }) => {
    const [form, setForm] = useState({
        fullName: '',
        username: '',
        password: '',
        confirmPassword: '',
        contactNumber: '',
        whatsappNumber: '',
        email: '',
        location: ''
    });

    const [passwordStrength, setPasswordStrength] = useState(0);
    const [passwordStrengthMessage, setPasswordStrengthMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [alert, setAlert] = useState(null); // State to hold alert message



    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        if (name === 'password') {
            const result = zxcvbn(value);
            setPasswordStrength(result.score); // Password strength (0-4 scale)
            setPasswordStrengthMessage(result.feedback.suggestions.join(' ')); // Suggestions
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            setAlert({ message: 'Passwords do not match!', type: 'error' });
            return;
        }

        if (passwordStrength < 3) {
            setAlert({ message: 'Password is too weak. Please choose a stronger password.', type: 'error' });
            return;
        }

        const payload = {
            fullName: form.fullName,
            username: form.username,
            password: form.password,
            contactNumber: form.contactNumber,
            whatsappNumber: form.whatsappNumber,
            email: form.email,
            location: { locationName: form.location } // We pass the selected location directly
        };

        try {
            const response = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.text();
            if (response.ok) {
                setAlert({ message: data, type: 'success' });

                setForm({
                    fullName: '',
                    username: '',
                    password: '',
                    confirmPassword: '',
                    contactNumber: '',
                    whatsappNumber: '',
                    email: '',
                    location: ''
                });

                onClose(); // Close the registration modal
                onOpenLogin(); // Open the login modal
            } else {
                setAlert({ message: data, type: 'error' });
            }
        } catch (error) {
            setAlert({ message: 'Error connecting to the server', type: 'error' });
        }
    };
    const handleCloseAlert = () => {
        setAlert(null); // Reset alert state when closed
    };



    if (!isOpen) return null;


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
            <div className={`bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative ${form.password ? 'expanded' : ''}`}>
                <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

                {/* Display AlertMessage if alert is present */}
                {alert && (
                    <AlertMessage
                        message={alert.message}
                        type={alert.type}
                        onClose={handleCloseAlert}
                    />
                )}

                <form onSubmit={handleSubmit} className="space-y-3">
                    {/* Full Name */}
                    <div className="flex items-center space-x-4">
                        <label htmlFor="fullName" className="w-1/3 text-right font-medium">
                            Full Name:
                        </label>
                        <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            value={form.fullName}
                            onChange={handleChange}
                            required
                            className="w-2/3 p-2 border rounded"
                        />
                    </div>

                    {/* Username */}
                    <div className="flex items-center space-x-4">
                        <label htmlFor="username" className="w-1/3 text-right font-medium">
                            Username:
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            value={form.username}
                            onChange={handleChange}
                            required
                            className="w-2/3 p-2 border rounded"
                        />
                    </div>

                    {/* Password */}
                    <div className="flex items-center space-x-4">
                        <label htmlFor="password" className="w-1/3 text-right font-medium">
                            Password:
                        </label>
                        <div className="w-2/3 relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={form.password}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border rounded pr-10"
                                autoComplete="new-password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute top-2 right-3 text-gray-500 hover:text-indigo-600"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-6 w-6"
                                    >
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-6 w-6"
                                    >
                                        <path d="M17.94 17.94A10.05 10.05 0 0112 19c-4.48 0-8.27-2.94-9.54-7a10.05 10.05 0 013.05-4.27M1 1l22 22" />
                                        <path d="M9.88 9.88a3 3 0 104.24 4.24" />
                                        <path d="M14.12 14.12L1 1" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                    {/* Password strength indicator */}
                    {/* Only show password strength indicator if password is entered */}
                    {form.password && (
                        <div className="mt-4 ml-40">
                            <progress value={passwordStrength} max={4} className="w-full h-2 bg-blue-200 rounded"></progress>
                            <p className="text-sm text-gray-500 mt-1">{passwordStrengthMessage}</p>
                        </div>
                    )}

                    {/* Confirm Password */}
                    <div className="flex items-center space-x-4">
                        <label htmlFor="confirmPassword" className="w-1/3 text-right font-medium">
                            Confirm Password:
                        </label>
                        <div className="w-2/3 relative">
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirm ? 'text' : 'password'}
                                value={form.confirmPassword}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border rounded pr-10"
                                autoComplete="new-password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute top-2 right-3 text-gray-500 hover:text-indigo-600"
                                aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
                            >
                                {showConfirm ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-6 w-6"
                                    >
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-6 w-6"
                                    >
                                        <path d="M17.94 17.94A10.05 10.05 0 0112 19c-4.48 0-8.27-2.94-9.54-7a10.05 10.05 0 013.05-4.27M1 1l22 22" />
                                        <path d="M9.88 9.88a3 3 0 104.24 4.24" />
                                        <path d="M14.12 14.12L1 1" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Contact Number */}
                    <div className="flex items-center space-x-4">
                        <label htmlFor="contactNumber" className="w-1/3 text-right font-medium">
                            Contact Number:
                        </label>
                        <div className="w-2/3 flex">
                            <div className="flex w-full">
                                <span className="flex items-center px-3 bg-gray-100 border border-r-0 rounded-l text-gray-700">
                                    +94
                                </span>
                                <input
                                    id="contactNumber"
                                    name="contactNumber"
                                    type="text"
                                    value={form.contactNumber}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/\D/, '');
                                        setForm({ ...form, contactNumber: val.slice(0, 9) });
                                    }}
                                    required
                                    className="flex-1 p-2 border border-l-0 rounded-r focus:outline-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* WhatsApp Number */}
                    <div className="flex items-center space-x-4">
                        <label htmlFor="whatsappNumber" className="w-1/3 text-right font-medium">
                            WhatsApp Number:
                        </label>
                        <div className="w-2/3 flex">
                            <div className="flex w-full">

                                <span className="flex items-center px-3 bg-gray-100 border border-r-0 rounded-l text-gray-700">
                                    +94
                                </span>
                                <input
                                    id="whatsappNumber"
                                    name="whatsappNumber"
                                    type="text"
                                    value={form.whatsappNumber}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/\D/, '');
                                        setForm({ ...form, whatsappNumber: val.slice(0, 9) });
                                    }}
                                    required
                                    className="flex-1 p-2 border border-l-0 rounded-r focus:outline-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-center space-x-4">
                        <label htmlFor="email" className="w-1/3 text-right font-medium">
                            Email:
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-2/3 p-2 border rounded"
                        />
                    </div>

                    {/* Location */}
                    <div className="flex items-center space-x-4">
                        <label htmlFor="location" className="w-1/3 text-right font-medium">
                            Location:
                        </label>
                        <select
                            id="location"
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            required
                            className="w-2/3 p-2 border rounded"
                        >
                            <option value="">Select Location</option>
                            {locations.map((loc) => (
                                <option key={loc} value={loc}>
                                    {loc}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        Register
                    </button>
                </form>

                <p className="mt-4 text-center text-sm">
                    Already have an account?{' '}
                    <button
                        onClick={() => {
                            onClose();
                            onOpenLogin();
                        }}
                        className="text-indigo-600 font-semibold hover:underline"
                    >
                        Login
                    </button>
                </p>

                <button
                    className="absolute top-2 right-3 text-gray-500 hover:text-black"
                    onClick={onClose}
                    aria-label="Close register modal"
                >
                    ✖
                </button>
            </div>
        </div >
    );
};

export default RegisterModal;
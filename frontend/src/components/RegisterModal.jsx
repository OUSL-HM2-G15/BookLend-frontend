import React, { useState, useEffect } from 'react';
import zxcvbn from 'zxcvbn';
import AlertMessage from './AlertMessage'; // Import the AlertMessage component


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

    const [locations, setLocations] = useState([]); // Fetched from backend

    // ** Reset form when modal closes
    useEffect(() => {
        if (!isOpen) {
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
            setPasswordStrength(0);
            setPasswordStrengthMessage('');
            setShowPassword(false);
            setShowConfirm(false);
            setAlert(null);
        }
    }, [isOpen]);

    // Auto-close alerts after 4 seconds
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [alert]);


    // Fetch locations from backend on component mount
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const res = await fetch('http://localhost:8080/api/locations');

                if (!res.ok) {
                    console.error('Failed to fetch locations', res.status);
                    setLocations([]);
                    return;
                }

                const data = await res.json();

                if (Array.isArray(data)) {
                    setLocations(data);
                } else {
                    setLocations([]);
                }
            } catch (err) {
                console.error(err);
                setLocations([]);
            }
        };

        fetchLocations();
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        if (name === 'password') {
            const result = zxcvbn(value);
            setPasswordStrength(result.score); // Password strength (0-4 scale)
            setPasswordStrengthMessage(result.feedback.suggestions.join(' ')); // Suggestions
        }
    };

    // ** helper function to validate Sri Lanka phone numbers**
    const isValidSriLankaNumber = (number) => {
        const digits = number.replace(/\D/g, '');
        return (digits.length === 10 && digits.startsWith('0')) || digits.length === 9;
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

        // ** Validate phone numbers before sending**
        if (!isValidSriLankaNumber(form.contactNumber)) {
            setAlert({ message: 'Invalid Contact Number. Must be 9 digits (without 0) or 10 digits starting with 0.', type: 'error' });
            return;
        }
        if (!isValidSriLankaNumber(form.whatsappNumber)) {
            setAlert({ message: 'Invalid WhatsApp Number. Must be 9 digits (without 0) or 10 digits starting with 0.', type: 'error' });
            return;
        }

        // ** Format numbers to +94XXXXXXXXX**
        const contactFormatted = '+94' + (form.contactNumber.startsWith('0') ? form.contactNumber.slice(1) : form.contactNumber);
        const whatsappFormatted = '+94' + (form.whatsappNumber.startsWith('0') ? form.whatsappNumber.slice(1) : form.whatsappNumber);

        const payload = {
            fullName: form.fullName,
            username: form.username,
            password: form.password,
            confirmPassword: form.confirmPassword,
            contactNumber: contactFormatted,
            whatsappNumber: whatsappFormatted,
            email: form.email,
            location: form.location // send just the name string 
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                setAlert({ message: data.message || "Registered successfully", type: 'success' });

                // Reset form
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
                // Delay before switching to login modal
                setTimeout(() => {
                    onClose();
                    onOpenLogin();
                }, 1500);
            } else {
                // Display backend error
                setAlert({ message: data.message || 'Registration failed', type: 'error' });
            }
        } catch (error) {
            setAlert({ message: 'Error connecting to the server', type: 'error' });
        }
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
                        onClose={() => setAlert(null)}
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
                        <div className="mt-4 ml-flex">
                            <progress
                                value={passwordStrength}
                                max={4}
                                className="w-full h-2 bg-blue-200 rounded"
                            ></progress>
                            <p
                                className={`text-sm mt-1 ${passwordStrength <= 1 ? "text-red-500" : // very weak
                                    passwordStrength === 2 ? "text-yellow-500" : // weak
                                        passwordStrength === 3 ? "text-blue-500" : // good
                                            "text-green-500" // strong
                                    }`}
                            >
                                {passwordStrengthMessage || (passwordStrength >= 3 ? "Strong password" : "Weak password")}
                            </p>
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
                                autoComplete="off"
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

                    {/* Contact & WhatsApp */}
                    {['contactNumber', 'whatsappNumber'].map((field) => (
                        <div key={field} className="flex items-center space-x-4">
                            <label htmlFor={field} className="w-1/3 text-right font-medium">{field === 'contactNumber' ? 'Contact Number:' : 'WhatsApp Number:'}</label>
                            <div className="w-2/3 flex">
                                <span className="flex items-center px-3 bg-gray-100 border border-r-0 rounded-l text-gray-700">+94</span>
                                <input
                                    id={field}
                                    name={field}
                                    type="text"
                                    value={form[field]}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/\D/g, '');
                                        setForm({ ...form, [field]: val.slice(0, 10) });
                                    }}
                                    required
                                    className="flex-1 p-2 border border-l-0 rounded-r focus:outline-blue-500"
                                />
                            </div>
                        </div>
                    ))}


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
                            {Array.isArray(locations) &&
                                locations.map((loc) => (
                                    <option key={loc.locationId} value={loc.locationName}>
                                        {loc.locationName}
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
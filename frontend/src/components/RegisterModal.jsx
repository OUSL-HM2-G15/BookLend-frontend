import React, { useState, useEffect } from 'react';
import zxcvbn from 'zxcvbn';
import { Form } from 'antd';
import { message } from 'antd';

const RegisterModal = ({ isOpen, onClose, onOpenLogin }) => {
    const [form] = Form.useForm();
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [passwordStrengthMessage, setPasswordStrengthMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [locations, setLocations] = useState([]); // Fetched from backend

    // ** Reset form when modal closes
    useEffect(() => {
        if (!isOpen) {
            form.resetFields();
            setPasswordStrength(0);
            setPasswordStrengthMessage('');
            setShowPassword(false);
            setShowConfirm(false);
        }
    }, [isOpen, form]);

    // Fetch locations from backend on component mount
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_URL}/locations`);

                if (!res.ok) throw new Error('Failed to fetch locations');
                const data = await res.json();
                setLocations(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error(err);
                setLocations([]);
            }
        };
        fetchLocations();
    }, []);


    const handlePasswordChange = (e) => {
        const value = e.target.value;
        const result = zxcvbn(value);
        setPasswordStrength(result.score);
        setPasswordStrengthMessage(result.feedback.suggestions.join(' '));
        form.setFields([
            {
                name: 'password',
                value: value,
            },
        ]);
    };

    // ** helper function to validate Sri Lanka phone numbers**
    const isValidSriLankaNumber = (number) => {
        const digits = number.replace(/\D/g, '');
        return (digits.length === 10 && digits.startsWith('0')) || digits.length === 9;
    };



    // Submit handler
    const handleSubmit = async (values) => {
        const { password, confirmPassword, contactNumber, whatsappNumber } = values;

        if (password !== confirmPassword) {
            return message.error('Passwords do not match!');
        }

        if (passwordStrength < 3) {
            return message.error('Password is too weak. Please choose a stronger password.');
        }

        // ** Validate phone numbers before sending**
        if (!isValidSriLankaNumber(contactNumber)) {
            return message.error('Invalid Contact Number.');
        }
        if (!isValidSriLankaNumber(whatsappNumber)) {
            return message.error('Invalid WhatsApp Number.');
        }

        // ** Format numbers to +94XXXXXXXXX**
        const contactFormatted = '+94' + (contactNumber.startsWith('0') ? contactNumber.slice(1) : contactNumber);
        const whatsappFormatted = '+94' + (whatsappNumber.startsWith('0') ? whatsappNumber.slice(1) : whatsappNumber);

        // Payload send locationId instead of name
        // Backend will fetch locationName
        const payload = {
            ...values,
            contactNumber: contactFormatted,
            whatsappNumber: whatsappFormatted,
            locationId: Number(values.location) // send ID
        };

        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (res.ok) {
                message.success(data.message || 'Registered successfully!');

                form.resetFields();
                setPasswordStrength(0);
                setPasswordStrengthMessage('');
                setTimeout(() => {
                    onClose();
                    onOpenLogin();
                }, 1500);
            } else {
                message.error(data.message || 'Registration failed');
            }
        } catch (err) {
            message.error('Error connecting to the server');
        }
    };

    if (!isOpen) return null;


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
            <div className={`bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative ${form.password ? 'expanded' : ''}`}>
                <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

                <Form form={form} onFinish={handleSubmit} className="space-y-3">
                    {/* Full Name */}
                    <div className="flex items-center space-x-4">
                        <label className="w-1/3 text-right font-medium">Full Name:</label>
                        <Form.Item name="fullName" className="w-2/3 m-0" rules={[{ required: true, message: 'Full Name required' }]}>
                            <input type="text" className="w-full p-2 border rounded focus:outline-blue-500" />
                        </Form.Item>
                    </div>

                    {/* Username */}
                    <div className="flex items-center space-x-4">
                        <label className="w-1/3 text-right font-medium">Username:</label>
                        <Form.Item name="username" className="w-2/3 m-0" rules={[{ required: true, message: 'Username required' }]}>
                            <input type="text" className="w-full p-2 border rounded focus:outline-blue-500" />
                        </Form.Item>
                    </div>

                    {/* Password */}
                    <div className="flex items-center space-x-4">
                        <label className="w-1/3 text-right font-medium">Password:</label>
                        <div className="w-2/3 relative">
                            <Form.Item name="password" className="m-0" rules={[{ required: true }]}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={handlePasswordChange}
                                    className="w-full p-2 border rounded pr-10 focus:outline-blue-500"
                                    autoComplete="new-password"
                                />
                            </Form.Item>
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-2 right-3 text-gray-500 hover:text-indigo-600"
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
                    {form.getFieldValue('password') && (
                        <div className="mt-2 ml-flex">
                            <progress value={passwordStrength} max={4} className="w-full h-2 bg-blue-200 rounded"></progress>
                            <p className={`text-sm mt-1 
                                ${passwordStrength <= 1 ? 'text-red-500' :
                                    passwordStrength === 2 ? 'text-yellow-500' :
                                        passwordStrength === 3 ? 'text-blue-500' :
                                            'text-green-500'}`}>
                                {passwordStrengthMessage || (passwordStrength >= 3 ? 'Strong password' : 'Weak password')}
                            </p>
                        </div>
                    )}


                    {/* Confirm Password */}
                    <div className="flex items-center space-x-4">
                        <label className="w-1/3 text-right font-medium">Confirm Password:</label>
                        <div className="w-2/3 relative">
                            <Form.Item name="confirmPassword" className="m-0" rules={[{ required: true }]}>
                                <input type={showConfirm ? 'text' : 'password'} className="w-full p-2 border rounded pr-10 focus:outline-blue-500" />
                            </Form.Item>
                            <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute top-2 right-3 text-gray-500 hover:text-indigo-600"
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
                            <label className="w-1/3 text-right font-medium">
                                {field === 'contactNumber' ? 'Contact Number:' : 'WhatsApp Number:'}
                            </label>
                            <Form.Item name={field} className="w-2/3 m-0"
                                rules={[{ required: true }]}>
                                <div className="flex">
                                    <span className="flex items-center px-3 bg-gray-100 border border-r-0 rounded-l text-gray-700">+94</span>
                                    <input type="text" className="flex-1 p-2 border border-l-0 rounded-r focus:outline-blue-500" maxLength={10} />
                                </div>
                            </Form.Item>
                        </div>
                    ))}


                    {/* Email */}
                    <div className="flex items-center space-x-4">
                        <label className="w-1/3 text-right font-medium">Email:</label>
                        <Form.Item name="email" className="w-2/3 m-0" rules={[{ required: true, type: 'email' }]}>
                            <input type="email" className="w-full p-2 border rounded focus:outline-blue-500" />
                        </Form.Item>
                    </div>

                    {/* Location */}
                    <div className="flex items-center space-x-4">
                        <label className="w-1/3 text-right font-medium">Location:</label>
                        <Form.Item name="location" className="w-2/3 m-0" rules={[{ required: true }]}>
                            <select className="w-full p-2 border rounded focus:outline-blue-500">
                                <option value="">Select Location</option>
                                {locations.map((loc) => (
                                    <option key={loc.locationId} value={loc.locationId}>
                                        {loc.locationName}
                                    </option>
                                ))}
                            </select>
                        </Form.Item>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        Register
                    </button>
                </Form>

                <p className="mt-4 text-center text-sm">
                    Already have an account?{' '}
                    <button
                        onClick={() => {
                            onClose();
                            onOpenLogin();
                        }}
                        className="text-blue-600 font-semibold hover:underline"
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
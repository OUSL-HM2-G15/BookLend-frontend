import React, { useState } from 'react';
import { message } from "antd";

const ForgotPasswordModal = ({ isOpen, onClose, onOpenReset }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/forgot-password`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email })
                });
            const data = await res.json();

            if (res.ok) {
                message.success(data.message || "Password reset link sent!");
                setTimeout(() => {
                    onClose();
                    onOpenReset(data.token || email); // pass token/email to reset
                }, 1500);
            } else {
                message.error(data.message || "Email not found");
            }
        } catch (error) {
            console.error(error);
            message.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
                {/* Close icon */}
                <button
                    className="absolute top-2 right-3 text-gray-500 hover:text-black"
                    onClick={onClose}
                    aria-label="Close forgot password modal"
                >
                    ✖
                </button>

                <h2 className="text-xl font-bold mb-4 text-center">Forgot Password</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-2 border rounded focus:outline-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                        disabled={loading}
                    >
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPasswordModal;

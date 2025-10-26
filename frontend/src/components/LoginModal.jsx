import React, { useState, useEffect } from 'react';


const LoginModal = ({ isOpen, onClose, onOpenRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false);
    

    // Password visible toggle
    const [showPassword, setShowPassword] = useState(false);

    // When modal closes, clear data (for safety)
    useEffect(() => {
        if (!isOpen) {
            setUsername('');
            setPassword('');
            setMsg('');
            setShowPassword(false);
        }
    }, [isOpen]);

    // It Handles the login form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg('');
        setLoading(true);
        try {

            // Simulate API call delay here
            await new Promise((r) => setTimeout(r, 1000));

            // Simulated success login, replace with real fetch in production
            if (username === "testuser" && password === "123456") {
                setMsg(' Login successful!');
                // Can save logged user here later
                onClose();
            } else {
                setMsg(' Invalid credentials');
            }
        } catch (error) {
            setMsg(' Error connecting to server.');
        } finally {
            setLoading(false);
        }
    };

    // If modal is closed, return nothing
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10"
            // NEW: Fade in animation using Tailwind + inline styles
            style={{ animation: 'fadeIn 0.3s ease forwards' }}

            aria-modal='true'
            role='dialog'
        >

            {/*Model container with scale,fade animation also */}
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                <h2 className="text-2xl font-bold text-center mb-4"
                    style={{ animation: 'scaleIn 0.3s ease forwards' }}>Log In</h2>

                {msg && <p className="text-center text-sm mb-4 text-red-600">{msg}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <input
                            id='username'
                            type="text"
                            className="w-full border border-gray-300 p-2 rounded focus:outline-blue-500"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required />
                    </div>
                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            id='password'
                            type={showPassword ? 'text' : 'password'} // Based on showPassword
                            className="w-full border border-gray-300 p-2 rounded focus:outline-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        { /* Eye icon button to toggle password */}
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-8 right-3 text-gray-500 hover:text-indigo-600"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? ( //Eye off
                                <svg
                                    xmlns="https://icons8.com/icon/85028/eye"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>

                            ) : (
                                //Eye
                                <svg
                                    xmlns="https://icons8.com/icon/96151/invisible"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M17.94 17.94A10.05 10.05 0 0112 19c-4.48 0-8.27-2.94-9.54-7a10.05 10.05 0 013.05-4.27M1 1l22 22" />
                                    <path d="M9.88 9.88a3 3 0 104.24 4.24" />
                                    <path d="M14.12 14.12L1 1" />
                                </svg>
                            )}

                        </button>
                    </div>


                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Log In'}
                    </button>
                </form>

                <button
                    className="absolute top-2 right-3 text-gray-500 hover:text-gray-800"
                    aria-label="Close login modal"
                    onClick={onClose}
                >
                    ✖

                </button>
                
                {/* Register link */}

                <p className="mt-6 text-center text-gray-600">
                    Don’t have an account?{' '}
                    <button
                        type="button"
                        onClick={() =>{ onClose(); onOpenRegister();}}
                        className="text-indigo-600 font-semibold hover:underline"
                    >
                        Register
                    </button>
                </p>

            </div>

            {/* ANIMATION */}
            <style>{`
                    @keyframes scaleIn {
                    0% {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                    }
        `   }</style>
        </div>
    );
};


export default LoginModal;
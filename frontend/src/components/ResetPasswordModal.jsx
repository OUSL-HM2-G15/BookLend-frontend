import React, { useState } from 'react';
import { data } from 'autoprefixer';
import AlertMessage from './AlertMessage';

const ResetPasswordModal = ({ isOpen, onClose, token }) => {
    const [form, setForm] = useState({ password: '', confirmPassword: '' });
    const [alert, setAlert] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAlert(null);
        if (form.password !== form.confirmPassword) {
            setAlert({ message: data.message || 'Passwords do not match!', type: 'error' });
            
            return;
        }
        setLoading(true);
        try {
            const res = await fetch('http://localhost:8080/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, password: form.password })
            });
            const data = await res.json();
            if (res.ok) 
                setAlert({ message: data.message || 'Password updated successfully!', type: 'success' });
                
            else 
                setAlert({message:data.setAlert || 'Invalid or expired token.',type:'error'});
        } catch (error) {
            console.error(error);
            setAlert({ message: data.message || 'Something went wrong.', type: 'error' });
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
                    aria-label="Close reset password modal"
                >
                    ✖
                </button>

                <h2 className="text-xl font-bold mb-4 text-center">Reset Password</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="password"
                        placeholder="New Password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        required
                        className="w-full p-2 border rounded focus:outline-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={form.confirmPassword}
                        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                        required
                        className="w-full p-2 border rounded focus:outline-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                        disabled={loading}
                    >
                         {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>

                {alert && <AlertMessage message={alert.message}type={alert.type} onClose={() => setAlert(null)} />}
            </div>
        </div>
    );
};

export default ResetPasswordModal;

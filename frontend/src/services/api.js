import axios from 'axios';

// ---------------------------
// Centralized Axios instance
// All backend API calls will go through this
// ---------------------------
const api = axios.create({
    baseURL: 'http://localhost:8080/api/auth', // backend base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
import axios from 'axios';

// ---------------------------
// Centralized Axios instance
// All backend API calls will go through this
// ---------------------------
const api = axios.create({
    baseURL:  `${process.env.REACT_APP_API_URL}/auth`, // backend base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: 'http://localhost:4000', // Adjust if backend port differs
    headers: {
        'Content-Type': 'application/json',
        includeCredentials: true,
    },
});

// Add interceptor to include token
api.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token'); // Assuming you store token as 'token'
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default api;

import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: 'http://localhost:4000/api', // Adjust if backend port differs
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add interceptor to include token
api.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token'); // Assuming you store token as 'token'
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
            // Also custom header if needed, but usually Bearer is enough. 
            // Backend uses 'x-auth-token' or Bearer? need to check backend middleware.
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default api;

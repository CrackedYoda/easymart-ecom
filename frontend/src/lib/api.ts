import axios from 'axios';
// import Cookies from 'js-cookie';
import { getAccessToken, setAccessToken } from '@/helpers/getaccesstoken';
const api = axios.create({
    baseURL: 'http://localhost:4000/api', // Adjust if backend port differs
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add interceptor to include token
api.interceptors.request.use(
    (config) => {
        const token = getAccessToken(); // Assuming you store token as 'token'
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use( (res) => res, async (error) => { 
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const res = await api.post('/user/refreshToken');
        if (res.data.token) {
            setAccessToken(res.data.token);
            originalRequest.headers['Authorization'] = `Bearer ${res.data.token}`;
            return api(originalRequest);
        }
        return Promise.reject(error);
    }
})


export default api;

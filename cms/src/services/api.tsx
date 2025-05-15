import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refresh_token');
                if (refreshToken) {
                    const response = await axios.post('http://localhost:8000/authentication/token/refresh/', {
                        refresh: refreshToken,
                    });
                    const { access } = response.data;
                    localStorage.setItem('access_token', access);
                    originalRequest.headers.Authorization = `Bearer ${access}`;
                    return api(originalRequest);
                }
            } catch (err) {
                console.error('Token refresh failed:', err);
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
            }
        }
        return Promise.reject(error);
    }
);

export default api;

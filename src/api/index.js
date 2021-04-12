import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost/public_html/slim3-booking-api/public/'
});

api.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem('access_token'));

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost/public_html/slim3-booking-api/public/'
});

api.interceptors.request.use(
  config => {
    return config;
  },
  error => Promise.reject(error)
);

export default api;

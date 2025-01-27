import axios, { AxiosInstance } from 'axios';

export const apiUrl = import.meta.env.VITE_API_BASE_URL;

const api: AxiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const refreshToken = localStorage.getItem('refresh');
//       const response = await axios.post(apiUrl + 'token/refresh/', {
//         refreshToken,
//       });
//       if (response.status === 200) {
//         localStorage.setItem('token', response.data.access);
//         localStorage.setItem('refresh', response.data.refresh);
//         return api(originalRequest);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default api;

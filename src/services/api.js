import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL || "https://default-url.com/api";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 50000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
  
      console.error("API Error:", error.response.data.message || error.message);
    } else if (error.request) {
      console.error("No response from server:", error.message);
    } else {
      console.error("Unexpected error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;

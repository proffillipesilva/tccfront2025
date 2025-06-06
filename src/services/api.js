import axios from "axios";
// ==============================================================================
// Conceptual File: src/services/api.js
// --- Axios Instance Configuration ---
// This would typically be in a separate file to configure your Axios instance
// with base URL, headers, and interceptors.
// ==============================================================================

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Add Authorization header to requests if a token exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Set Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Basic error handling and token storage (if needed, but typically handled by login component)
api.interceptors.response.use(
  (response) => response, // Return response as is for successful requests
  (error) => {
    // Example: Log out user if token is expired or invalid (e.g., 401 Unauthorized)
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized request. Token might be expired or invalid. Logging out...');
      localStorage.removeItem('authToken'); // Clear invalid token
      // You might dispatch a logout action to a Redux store here
      // For this example, we'll just log and let the calling component handle it
    }
    return Promise.reject(error); // Propagate the error for the calling component to handle
  }
);

export default api;
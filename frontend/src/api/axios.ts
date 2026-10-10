import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/auth.store";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Store reference to avoid circular dependency
let clearAuthStore: () => void;

export const setClearAuthStore = (fn: () => void) => {
  clearAuthStore = fn;
};

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && originalRequest && !originalRequest.headers["x-retry"]) {
      originalRequest.headers["x-retry"] = "true";
      
      // Clear auth store and redirect
      if (clearAuthStore) {
        clearAuthStore();
      } else {
        // Fallback if not set
        useAuthStore.getState().setUser(null);
      }
      
      toast.error("Session expired. Please log in again.");
      
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    }

    return Promise.reject(error);
  }
);

export default api;
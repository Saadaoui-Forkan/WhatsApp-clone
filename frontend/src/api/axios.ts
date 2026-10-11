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

// Endpoint used to check whether the visitor has an active session.
// A 401 on it simply means "not logged in" and must not be treated as an expired session.
const SESSION_CHECK_URL = "/users/me";

// Public auth pages where an unauthenticated 401 is expected and no redirect is needed.
const AUTH_PAGES = ["/login", "/register", "/forgot-password", "/reset-password"];

const isOnAuthPage = () =>
  AUTH_PAGES.some((page) => window.location.pathname.startsWith(page));

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    const isSessionCheck = originalRequest?.url?.includes(SESSION_CHECK_URL) ?? false;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest.headers["x-retry"] &&
      !isSessionCheck &&
      !isOnAuthPage()
    ) {
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
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      }, 1500);
    }

    return Promise.reject(error);
  }
);

export default api;
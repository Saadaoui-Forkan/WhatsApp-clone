import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setClearAuthStore } from "./api/axios";
import { useAuthStore } from "./store/auth.store";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 20 * 1000,
      gcTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
});

// Initialize the clear auth store function for axios interceptor
setClearAuthStore(() => {
  useAuthStore.getState().clearAuth();
});

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(
      (registration) => {
        console.log('SW registered: ', registration.scope);
      },
      (registrationError) => {
        console.log('SW registration failed: ', registrationError);
      }
    );
  });
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);

// register()
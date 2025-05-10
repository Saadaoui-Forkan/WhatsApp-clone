import { Outlet } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import { useToggleModeStore } from "../store/mode.store";
import { useEffect } from "react";

export default function Layout() {
  const { mode, toggleMode } = useToggleModeStore();
  useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-between">
      <div className="fixed top-3 right-3">
        <button
          onClick={toggleMode}
          className="text-xl text-emerald-600 dark:text-purple-300 hover:scale-110 transition"
        >
          {mode === "dark" ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto h-[100vh]">
        <Outlet />
      </div>

      <footer className="text-center text-sm text-gray-600 dark:text-gray-300 p-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        © {new Date().getFullYear()} —{" "}
        <a
          href="https://personal-portfolio-six-pearl-25.vercel.app/en"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-emerald-700 dark:text-purple-300 hover:text-emerald-800 dark:hover:text-purple-200"
        >
          Mahmoud Saadaoui
        </a>
      </footer>
    </div>
  );
}

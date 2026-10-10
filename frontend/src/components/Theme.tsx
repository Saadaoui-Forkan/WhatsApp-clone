import { useEffect } from "react";
import { useToggleModeStore } from "../store/mode.store";
import { FaMoon, FaSun } from "react-icons/fa";

const Theme = () => {
  const { mode, toggleMode } = useToggleModeStore();
  useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);
  return (
    <div className="fixed bottom-4 right-4 z-40 md:bottom-24 md:right-6">
      <button
        onClick={toggleMode}
        className="btn-icon bg-white dark:bg-surface-cardDark shadow-soft-lg"
        aria-label={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      >
        {mode === "dark" ? <FaSun size={20} /> : <FaMoon size={20} />}
      </button>
    </div>
  );
};

export default Theme;
import { useEffect } from 'react'
import { useToggleModeStore } from '../store/mode.store';
import { FaMoon, FaSun } from 'react-icons/fa';

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
    <div className="fixed top-3 right-3">
        <button
          onClick={toggleMode}
          className="text-xl text-emerald-600 dark:text-purple-300 hover:scale-110 transition"
        >
          {mode === "dark" ? <FaSun /> : <FaMoon />}
        </button>
      </div>
  )
}

export default Theme
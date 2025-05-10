import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface ToggleMode {
  mode: "dark" | "light"
  toggleMode: () => void
}

export const useToggleModeStore = create<ToggleMode>()(
  devtools(
    persist(
      (set, get) => ({
        mode: "light",
        toggleMode: () =>
          set({ mode: get().mode === "light" ? "dark" : "light" }),
      }),
      { name: 'mode' },
    ),
  ),
)
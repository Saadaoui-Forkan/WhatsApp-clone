import { create } from 'zustand'
import { persist } from 'zustand/middleware';

interface IAuth {
  user: string | null;
  token: string;
  setUser: (user: string | null) => void;
  setToken: (token: string) => void
}

export const useAuthStore = create<IAuth>()(
  persist(
    (set) => ({
      user: null,
      token: "",
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
    }),
    { name: 'auth' }
  )
);
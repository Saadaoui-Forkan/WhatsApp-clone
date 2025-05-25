import { create } from 'zustand'
import { persist } from 'zustand/middleware';

interface IUser {
  id: string;
  name: string;
  bio?: string;
  photoProfile?: string;
}

interface IAuth {
  user: IUser | null;
  token: string;
  setUser: (user: IUser | null) => void;
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
import { create } from 'zustand'
import { persist } from 'zustand/middleware';
import { IAuth, IFriend } from '../types/user.types';

export const useAuthStore = create<IAuth>()(
  persist(
    (set) => ({
      user: null,
      token: "",
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      friends: [],
      setFriends: (friends) => set({friends}),
      addFriend: (friend: IFriend) => 
        set((state) => ({ friends: [...state.friends, friend] }))
    }),
    { name: 'auth' }
  )
);
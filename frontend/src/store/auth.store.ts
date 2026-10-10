import { create } from 'zustand'
import { persist } from 'zustand/middleware';
import { IAuth, IFriend } from '../types/user.types';
import { IConversation } from '../types/message.types';

export const useAuthStore = create<IAuth>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearAuth: () => set({ user: null }),
      friends: [],
      setFriends: (friends) => set({friends}),
      addFriend: (friend: IFriend) => 
        set((state) => ({ friends: [...state.friends, friend] })),
      conversations: [],
      setConversations: (conversations: IConversation[]) => set({ conversations }),
      typing: false,
      setTyping: (typing) => set({ typing })
    }),
    { name: 'auth' }
  )
);
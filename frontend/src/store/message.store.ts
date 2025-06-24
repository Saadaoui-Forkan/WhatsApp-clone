import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IMessage, IMessages } from '../types/message.types';

export const useMessageStore = create<IMessages>()(
  devtools(
    (set) => ({
      messages: [],
      setMessages: (messages) => set({ messages }),
      addMessage: (message: IMessage) =>
        set((state) => ({ messages: [...state.messages, message] })),
    }) 
  )
);
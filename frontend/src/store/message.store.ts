import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IMessage, IMessages } from '../types/message.types';

export const useMessageStore = create<IMessages>()(
  devtools(
    (set) => ({
      messagesByUser: {},
      setMessagesForUser: (userId, messages) =>
        set((state) => ({
          messagesByUser: { ...state.messagesByUser, [userId]: messages },
        })),
      addMessage: (currentUserId, message) => {
        const otherUserId =
          message.senderId === currentUserId
            ? message.receiverId
            : message.senderId;
        set((state) => ({
          messagesByUser: {
            ...state.messagesByUser,
            [otherUserId]: [...(state.messagesByUser[otherUserId] || []), message],
          },
        }));
      },
      prependMessages: (userId, messages) =>
        set((state) => ({
          messagesByUser: {
            ...state.messagesByUser,
            [userId]: [...messages, ...(state.messagesByUser[userId] || [])],
          },
        })),
      updateMessageSeen: (userId, messageIds) =>
        set((state) => {
          const userMessages = state.messagesByUser[userId] || [];
          const updated = userMessages.map((m) =>
            messageIds.includes(m.id) ? { ...m, seen: true } : m
          );
          return {
            messagesByUser: { ...state.messagesByUser, [userId]: updated },
          };
        }),
      markAllAsSeen: (userId) =>
        set((state) => {
          const userMessages = state.messagesByUser[userId] || [];
          const updated = userMessages.map((m) => ({ ...m, seen: true }));
          return {
            messagesByUser: { ...state.messagesByUser, [userId]: updated },
          };
        }),
    })
  )
);

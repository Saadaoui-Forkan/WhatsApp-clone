import { Socket } from 'socket.io-client';
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface SocketStore {
  socket: Socket | null;
  setSocket: (socket: Socket | null) => void;
}

export const useSocketStore = create<SocketStore>()(
  devtools((set) => ({
    socket: null,
    setSocket: (socket) => set({ socket }),
  }))
);
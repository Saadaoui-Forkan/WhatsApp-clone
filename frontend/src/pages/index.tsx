import { useEffect } from "react";
import Sidebar from "../components/sidebar";
import { Outlet } from "react-router-dom";
import io from "socket.io-client"
import { useSocketStore } from "../store/socket.store";

const Home = () => {
  const { setSocket } = useSocketStore()
  useEffect(() => {
    const socket = io('http://localhost:6000')
    setSocket(socket)

    socket.on('connect', () => {
      console.log("connected to the server with the id: ", socket.id)
    })

    socket.on("disconnect", () => {
      console.log("disconnected from the server")
    })

    return () => {
      socket.disconnect()
    }
  }, [])
  
  return (
    <div className="flex h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;

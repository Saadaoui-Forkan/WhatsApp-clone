import { lazy, Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import io from "socket.io-client";
import { useSocketStore } from "../store/socket.store";
import { useAuthStore } from "../store/auth.store";
import { useFetchFriends } from "../hooks/useAuth";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { useFetchMessages } from "../hooks/useMessage";
import { useMessageStore } from "../store/message.store";

const Sidebar = lazy(() => import("../components/sidebar"));

const Home = () => {
  const { setSocket } = useSocketStore();
  const { token, user, setFriends, addFriend, setTyping } = useAuthStore();
  const { setMessages, addMessage } = useMessageStore()
  const {
    data: friendsData,
    isLoading: friendsLoading,
    error: friendsError,
  } = useFetchFriends(token);
  
  const {
    data: messagesData,
    isLoading: messagesLoading,
    error: messagesError,
  } = useFetchMessages(token);
  
  useEffect(() => {
    if (!token) return
    const socket = io(process.env.REACT_APP_BACKEND_URL, {
      query: {
        token: token,
      },
    });
    setSocket(socket);

    socket.on("connect", () => {
      console.log("connected to the server with the id: ", socket.id);
    });

    socket.on("user_created", (userCreated) => {
      if (userCreated.id !== user?.id) {
        addFriend(userCreated);
      }
    });

    socket.on("receive_message", (message) => {
      addMessage(message);
    });

    socket.on("typing", () => setTyping(true))
    socket.on("stop_typing", () => setTyping(false))

    socket.on("disconnect", () => {
      console.log("disconnected from the server");
    });

    return () => {
      socket.disconnect();
    };
  }, [token, addFriend, addMessage, setSocket, setTyping, user?.id]);

  useEffect(() => {
    if (friendsData?.friends) {
      setFriends(friendsData.friends);
    }
  }, [friendsData, setFriends]);

  useEffect(() => {
    if (messagesData?.messages) {
      setMessages(messagesData.messages);
    }
  }, [messagesData, setMessages]);

  if (friendsError || messagesError) {
    console.error(friendsError || messagesError);
    toast.error(
      (friendsError || messagesError)?.message || "An unexpected error occurred."
    );
    return null;
  }

  if (friendsLoading || messagesLoading) {
    return <Spinner />;
  }
  return (
    <div className="flex h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <Suspense fallback={<Spinner />}>
        <Sidebar />
      </Suspense>
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;

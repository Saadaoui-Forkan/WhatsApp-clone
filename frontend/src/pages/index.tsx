import { lazy, Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import io from "socket.io-client";
import { useSocketStore } from "../store/socket.store";
import { useAuthStore } from "../store/auth.store";
import { useFetchConversations } from "../hooks/useAuth";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { useMessageStore } from "../store/message.store";

const Sidebar = lazy(() => import("../components/sidebar"));

const Home = () => {
  const { pathname } = useLocation();
  const receiverId = pathname.slice(1);
  const { setSocket } = useSocketStore();
  const { token, user, setFriends, setConversations, addFriend } = useAuthStore();
  const { addMessage, markAllAsSeen } = useMessageStore();
  const {
    data: conversationsData,
    isLoading: conversationsLoading,
    error: conversationsError,
  } = useFetchConversations(token);

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
      if (user) {
        addMessage(user.id, message);
      }
    });

    socket.on("seen", ({ senderId }) => {
      if (user && senderId !== user.id) {
        markAllAsSeen(senderId);
      }
    });

    socket.on("disconnect", () => {
      console.log("disconnected from the server");
    });

    return () => {
      socket.disconnect();
    };
  }, [token, addFriend, addMessage, setSocket, markAllAsSeen, user?.id]);

  useEffect(() => {
    if (conversationsData?.conversations) {
      setConversations(conversationsData.conversations);
      setFriends(conversationsData.conversations.map((c: any) => c.user));
    }
  }, [conversationsData, setConversations, setFriends]);

  if (conversationsError) {
    console.error(conversationsError);
    toast.error(
      (conversationsError as any)?.message || "An unexpected error occurred."
    );
    return null;
  }

  if (conversationsLoading) {
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

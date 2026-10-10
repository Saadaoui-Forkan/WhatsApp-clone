import { lazy, Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import io from "socket.io-client";
import { useSocketStore } from "../store/socket.store";
import { useAuthStore } from "../store/auth.store";
import { useFetchConversations } from "../hooks/useAuth";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { useMessageStore } from "../store/message.store";

const Sidebar = lazy(() => import("../components/sidebar"));

const Home = () => {
  const { setSocket } = useSocketStore();
  const { user, setFriends, setConversations, addFriend } = useAuthStore();
  const { addMessage, markAllAsSeen } = useMessageStore();
  const {
    data: conversationsData,
    isLoading: conversationsLoading,
    error: conversationsError,
  } = useFetchConversations();

  useEffect(() => {
    // Socket will read JWT from cookie automatically (withCredentials: true)
    const socket = io(process.env.REACT_APP_BACKEND_URL, {
      withCredentials: true,
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
  }, [addFriend, addMessage, setSocket, markAllAsSeen, user]);

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
    <div className="chat-layout">
      <Suspense fallback={<Spinner />}>
        <Sidebar />
      </Suspense>
      <div className="chat-main">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
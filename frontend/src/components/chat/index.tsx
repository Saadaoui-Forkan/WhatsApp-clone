import ChatMessage from "./ChatMessage";
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";
import { useLocation } from "react-router-dom";
import { useMessageStore } from "../../store/message.store";
import { useAuthStore } from "../../store/auth.store";
import { useFetchConversationMessages } from "../../hooks/useMessage";
import chat from "../../assets/chat.png";
import { useEffect, useRef } from "react";

const Chat = () => {
  const { pathname } = useLocation();
  const receiverId = pathname.slice(1);
  const { messagesByUser, setMessagesForUser, prependMessages } = useMessageStore();
  const { user, token } = useAuthStore();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useFetchConversationMessages(receiverId, token);
  const scrollRef = useRef<HTMLDivElement>(null);
  const loadedPagesRef = useRef(0);

  const currentMessages = messagesByUser[receiverId] || [];

  useEffect(() => {
    if (data?.pages && loadedPagesRef.current < data.pages.length) {
      if (loadedPagesRef.current === 0 && data.pages[0]) {
        setMessagesForUser(receiverId, data.pages[0].messages);
        loadedPagesRef.current = 1;
      }
      for (let i = loadedPagesRef.current; i < data.pages.length; i++) {
        prependMessages(receiverId, data.pages[i].messages);
      }
      loadedPagesRef.current = data.pages.length;
    }
  }, [data?.pages.length, receiverId, setMessagesForUser, prependMessages]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop } = scrollRef.current;
      if (scrollTop === 0 && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }
  };

  return (
    <div className="flex flex-col flex-grow h-full pb-10">
      <ChatHeader />
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-grow overflow-y-auto p-4 space-y-2"
      >
        {currentMessages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 dark:text-gray-500">
            <img src={chat} alt="No messages" className="w-12 h-12 mb-4" />
            <p className="text-lg font-medium">No messages yet</p>
            <p className="text-sm">Start the conversation now!</p>
          </div>
        ) : (
          currentMessages.map((message) => (
            <ChatMessage
              key={message.id}
              isSender={message.senderId === user?.id}
              content={message.content}
              createdAt={message.createdAt}
              seen={message.seen}
            />
          ))
        )}
      </div>
      <ChatFooter />
    </div>
  );
};

export default Chat;

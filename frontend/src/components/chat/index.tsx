import ChatMessage from "./ChatMessage";
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";
import { useLocation } from "react-router-dom";
import { useMessageStore } from "../../store/message.store";
import { getReceiverMessages } from "../../utils/helpers";
import { useAuthStore } from "../../store/auth.store";
import chat from "../../assets/chat.png";

const Chat = () => {
  const { pathname } = useLocation();
  const receiverId = pathname.slice(1);
  const { messages } = useMessageStore();
  const { user } = useAuthStore();

  const currentMessages = getReceiverMessages(messages, receiverId);

  // if (currentMessages.length === 0) {
  //   return (
  //     <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 dark:text-gray-500">
  //       <img
  //         src={chat}
  //         alt="No messages"
  //         className="w-12 h-12 mb-4 opacity-60"
  //       />
  //       <p className="text-lg font-medium">No messages yet</p>
  //       <p className="text-sm">Start the conversation now!</p>
  //     </div>
  //   );
  // }
  return (
    <div className="flex flex-col flex-grow h-full pb-10">
      <ChatHeader />
      <div className="flex-grow overflow-y-auto p-4 space-y-2">
        {currentMessages.length === 0 ? (<div className="h-full flex flex-col items-center justify-center text-center text-gray-400 dark:text-gray-500">
         <img
           src={chat}
           alt="No messages"
           className="w-12 h-12 mb-4"
         />
        <p className="text-lg font-medium">No messages yet</p>
      <p className="text-sm">Start the conversation now!</p>
      </div>) : (
        currentMessages.map((message) => (
          <ChatMessage
            key={message.id}
            isSender={message.senderId === user?.id}
            content={message.content}
            createdAt={message.createdAt}
          />
        )))}
      </div>
      <ChatFooter />
    </div>
  );
};

export default Chat;

import ChatMessage from "./ChatMessage";
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";
import { useLocation } from "react-router-dom";
import { useMessageStore } from "../../store/message.store";
import { IMessage } from "../../types/message.types";
import { getReceiverMessages } from "../../utils/helpers";
import { useAuthStore } from "../../store/auth.store";

const Chat = () => {
  const {pathname} = useLocation()
  const receiverId = pathname.slice(1)
  const { messages } = useMessageStore()
  const { user } = useAuthStore()
  
  const currentMessages = getReceiverMessages(messages, receiverId)
  return (
    <div className="flex flex-col flex-grow h-full pb-10">
      <ChatHeader />
      <div className="flex-grow overflow-y-auto p-4 space-y-2">
        {
          currentMessages.map(message => (
            <ChatMessage
              key={message.id}
              isSender={message.senderId === user?.id}
              content={message.content}
              createdAt={message.createdAt}
            />
          ))
        }
      </div>
      <ChatFooter />
    </div>
  );
};

export default Chat;

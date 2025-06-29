import { useNavigate } from "react-router-dom";
import { MessageItemProps } from "../../types/message.types";
import { useSocketStore } from "../../store/socket.store";
import { useMessageStore } from "../../store/message.store";
import { formatMessageDate, getReceiverMessages } from "../../utils/helpers";

const MessageItem = ({ id, name, avatar, onClick }: MessageItemProps) => {
  const { socket } = useSocketStore();
  const { messages, setMessages } = useMessageStore();
  const navigate = useNavigate();

  const handleClick = () => {
    onClick?.();
    navigate(`/${id}`);

    socket?.emit("seen", id);

    setMessages(
      messages.map((message) =>
        message.senderId === id ? { ...message, seen: true } : message
      )
    );
  };

  const contactMessages = getReceiverMessages(messages, id);
  const unreadMessages = contactMessages.filter(
    (message) => !message.seen && message.receiverId !== id
  );

  const lastUnreadMessage = unreadMessages.at(-1);

  const contentPreview = lastUnreadMessage
    ? lastUnreadMessage.content.length > 10
      ? lastUnreadMessage.content.slice(0, 10) + "..."
      : lastUnreadMessage.content
    : "👋 No messages yet – say hello!";

  const formattedTime = lastUnreadMessage
    ? formatMessageDate(lastUnreadMessage.createdAt)
    : "";
  return (
    <div
      className="cursor-pointer flex items-center px-2 py-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      onClick={handleClick}
    >
      <img
        src={avatar}
        alt="profilePicture"
        className={`w-10 h-10 rounded-full object-cover`}
      />
      
      <div className="ml-3 flex-grow">
        <p className="font-medium text-sm">{name}</p>
        <p
          className={`text-xs truncate ${
            lastUnreadMessage
              ? "text-gray-500 dark:text-gray-400"
              : "text-gray-400"
          }`}
        >
          {contentPreview}
        </p>
      </div>
      <div className="ml-auto flex flex-col items-end space-y-1">
        {lastUnreadMessage && (
          <span className="text-xs text-gray-400">{formattedTime}</span>
        )}
        {unreadMessages.length > 0 && (
          <div className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {unreadMessages.length}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageItem;

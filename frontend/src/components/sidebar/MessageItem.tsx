import { useNavigate } from "react-router-dom";
import { IConversation, MessageItemProps } from "../../types/message.types";
import { useSocketStore } from "../../store/socket.store";
import { useMessageStore } from "../../store/message.store";
import { useAuthStore } from "../../store/auth.store";
import { formatMessageDate } from "../../utils/helpers";

const MessageItem = ({ conversation, onClick }: MessageItemProps) => {
  const { socket } = useSocketStore();
  const { markAllAsSeen } = useMessageStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const { user: contact, lastMessage, unreadCount } = conversation;

  const handleClick = () => {
    onClick?.();
    navigate(`/${contact.id}`);

    if (socket && user && unreadCount > 0) {
      socket.emit("seen", contact.id);
      markAllAsSeen(contact.id);
    }
  };

  const contentPreview = lastMessage
    ? lastMessage.content.length > 20
      ? lastMessage.content.slice(0, 20) + "..."
      : lastMessage.content
    : "👋 No messages yet – say hello!";

  const formattedTime = lastMessage
    ? formatMessageDate(lastMessage.createdAt)
    : "";

  return (
    <div
      className="cursor-pointer flex items-center px-2 py-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      onClick={handleClick}
    >
      <img
        src={contact.profilePicture?.secureUrl || ""}
        alt="profilePicture"
        className="w-10 h-10 rounded-full object-cover"
      />

      <div className="ml-3 flex-grow min-w-0">
        <p className="font-medium text-sm truncate">{contact.name}</p>
        <p
          className={`text-xs truncate ${
            unreadCount > 0
              ? "text-gray-700 dark:text-gray-200 font-medium"
              : "text-gray-400"
          }`}
        >
          {contentPreview}
        </p>
      </div>
      <div className="ml-auto flex flex-col items-end space-y-1">
        {lastMessage && (
          <span className="text-xs text-gray-400">{formattedTime}</span>
        )}
        {unreadCount > 0 && (
          <div className="bg-teal-600 text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
            {unreadCount}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageItem;

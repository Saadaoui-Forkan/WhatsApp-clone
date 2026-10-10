import { useNavigate } from "react-router-dom";
import { MessageItemProps } from "../../types/message.types";
import { useSocketStore } from "../../store/socket.store";
import { useMessageStore } from "../../store/message.store";
import { useAuthStore } from "../../store/auth.store";
import { formatMessageDate } from "../../utils/helpers";
import { defaultAvatar } from "../../utils/constantes";

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
    ? lastMessage.attachment
      ? "📷 Image"
      : lastMessage.content.length > 30
        ? lastMessage.content.slice(0, 30) + "..."
        : lastMessage.content
    : "No messages yet – say hello!";

  const formattedTime = lastMessage
    ? formatMessageDate(lastMessage.createdAt)
    : "";

  return (
    <div
      className="cursor-pointer flex items-center gap-3 px-3 py-3 rounded-2xl hover:bg-surface-light dark:hover:bg-surface-borderDark transition-colors"
      onClick={handleClick}
    >
      <img
        src={contact.profilePicture?.secureUrl || defaultAvatar}
        alt={contact.name}
        className="avatar-md flex-shrink-0 ring-2 ring-primary-200 dark:ring-primary-800"
      />

      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 dark:text-white truncate">{contact.name}</p>
        <p
          className={`text-sm truncate ${
            unreadCount > 0
              ? "text-gray-700 dark:text-gray-200 font-medium"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {contentPreview}
        </p>
      </div>
      <div className="flex flex-col items-end gap-1 flex-shrink-0">
        {lastMessage && (
          <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">{formattedTime}</span>
        )}
        {unreadCount > 0 && (
          <span className="unread-badge">{unreadCount > 99 ? "99+" : unreadCount}</span>
        )}
      </div>
    </div>
  );
};

export default MessageItem;
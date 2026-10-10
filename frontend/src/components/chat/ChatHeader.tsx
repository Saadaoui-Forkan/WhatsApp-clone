import { useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { defaultAvatar } from "../../utils/constantes";
import { Logout } from "./Logout";
import { getContactById } from "../../utils/helpers";

const ChatHeader = () => {
  const location = useLocation();
  const receiverId = location.pathname.slice(1);
  const { conversations } = useAuthStore();
  const contact = getContactById(conversations.map(c => c.user), receiverId);
  const unreadCount = conversations.find(c => c.user.id === receiverId)?.unreadCount ?? 0;

  return (
    <div className="chat-header">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <img
          src={contact?.profilePicture?.secureUrl || defaultAvatar}
          alt={contact?.name || "Avatar"}
          className="avatar-md ring-2 ring-primary-200 dark:ring-primary-800 flex-shrink-0"
        />
        <div className="min-w-0">
          <p className="font-semibold text-gray-900 dark:text-white truncate">{contact?.name}</p>
          <p className="text-xs flex items-center gap-1.5">
            {unreadCount > 0 ? (
              <span className="flex gap-0.5 text-primary-600 dark:text-primary-400">
                <span className="animate-bounce delay-75">.</span>
                <span className="animate-bounce delay-150">.</span>
                <span className="animate-bounce delay-[225ms]">.</span>
              </span>
            ) : (
              <span className="text-gray-500 dark:text-gray-400">{contact?.bio || "Online"}</span>
            )}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {unreadCount > 0 && (
          <span className="unread-badge">{unreadCount > 99 ? "99+" : unreadCount}</span>
        )}
        <Logout />
      </div>
    </div>
  );
};

export default ChatHeader;
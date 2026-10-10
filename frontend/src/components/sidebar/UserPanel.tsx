import { ChangeEvent, useState } from "react";
import { useAuthStore } from "../../store/auth.store";
import { defaultAvatar } from "../../utils/constantes";
import Profile from "../profile";
import Search from "./Search";
import MessageItem from "./MessageItem";
import { FiFolder } from "react-icons/fi";
import { UserPanelProps } from "../../types/message.types";
import { Logout } from "../chat/Logout";

const UserPanel = ({ onItemClick }: UserPanelProps) => {
  const { user, conversations } = useAuthStore();
  const [showProfile, setShowProfile] = useState(false);
  const [search, setSearch] = useState("");
  const [showUnseenMessages, setShowUnseenMessages] = useState(false);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleShowUnseenMessages = () => {
    setShowUnseenMessages((val) => !val);
  };

  const searchedConversations = conversations.filter((conv) =>
    conv.user.name.toLowerCase().includes(search.toLowerCase().trim())
  );

  const filteredConversations = searchedConversations.filter((conv) => {
    if (!showUnseenMessages) return true;
    return conv.unreadCount > 0;
  });

  if (showProfile) return <Profile onclose={() => setShowProfile(false)} />;

  return (
    <div className="w-full h-full flex flex-col p-4 pb-10 overflow-y-auto">
      {/* Current user profile */}
      <div
        className="flex items-center gap-3 p-3 rounded-2xl bg-surface-light dark:bg-surface-borderDark border border-surface-border dark:border-surface-borderDark cursor-pointer hover:bg-surface-border dark:hover:bg-surface-borderDark transition-colors"
        onClick={() => setShowProfile(true)}
      >
        <img
          src={user?.photoProfile || defaultAvatar}
          alt="Avatar"
          className="avatar-md ring-primary-200 dark:ring-primary-800"
        />
        <div className="flex-1 min-w-0 flex flex-col">
          <p className="font-semibold text-gray-900 dark:text-white truncate">{user?.name}</p>
          {user?.bio && <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.bio}</p>}
        </div>
      </div>

      <Search
        search={search}
        handleSearch={handleSearch}
        handleShowUnseenMessages={handleShowUnseenMessages}
        showUnseenMessages={showUnseenMessages}
      />

      <div className="flex-1 space-y-1 overflow-y-auto">
        {filteredConversations.length > 0 ? (
          filteredConversations.map((conv) => (
            <MessageItem
              key={conv.user.id}
              conversation={conv}
              onClick={onItemClick}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center mt-10 text-center text-gray-500 dark:text-gray-400 px-4">
            <FiFolder className="empty-state-icon" />
            <p className="empty-state-title">No conversations yet</p>
            <p className="empty-state-subtitle">Start a new chat to see it here</p>
          </div>
        )}
      </div>

      <div className="p-2 border-t border-surface-border dark:border-surface-borderDark">
        <Logout />
      </div>
    </div>
  );
};

export default UserPanel;
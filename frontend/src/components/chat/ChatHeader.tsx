import { useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { defaultAvatar } from "../../utils/constantes";
import { Logout } from "./Logout";
import { getContactById } from "../../utils/helpers";

const ChatHeader = () => {
  const location = useLocation();
  const receiverId = location.pathname.slice(1);
  const { friends, typing } = useAuthStore();
  const contact = getContactById(friends, receiverId);
  return (
    <div className="p-4 border-b border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
      <Logout />
      {contact && (
        <div className="flex items-center gap-3">
          <img
            src={contact?.profilePicture?.secureUrl || defaultAvatar}
            alt="Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-sm">{contact.name}</p>
            <p className="text-xs text-green-500">
              {typing ? (
                <span className="flex gap-1">
                  <span className="animate-bounce delay-75">.</span>
                  <span className="animate-bounce delay-150">.</span>
                  <span className="animate-bounce delay-[225ms]">.</span>
                </span>
              ) : (
                contact.name
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatHeader;
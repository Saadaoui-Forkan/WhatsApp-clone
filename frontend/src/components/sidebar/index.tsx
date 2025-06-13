import { FaSearch } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import MessageItem from "./MessageItem";
import Profile from "../profile";
import { useToggleShow } from "../../hooks/useToggleShow";
import { useAuthStore } from "../../store/auth.store";
import { defaultAvatar } from "../../utils/constantes";

export default function Sidebar() {
  const { show, toggleVisibility } = useToggleShow();
  const { user } = useAuthStore()

  if (show) {
    return <Profile/>
  }
  return (
    <div className="w-full h-full flex flex-col p-4">
      {/* Avatar section  */}
      <div 
        className="flex items-center mb-4 p-2 cursor-pointer transition-transform duration-300 hover:scale-105" 
        onClick={toggleVisibility}
      >
        <img
          src={user?.photoProfile ? user?.photoProfile : defaultAvatar}
          alt="Avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="ml-3 flex flex-col">
          <p className="font-semibold text-sm">{user?.name}</p>
          {user?.bio && <p className="text-xs">{user.bio}</p>}
        </div>
      </div>

      {/* Search & filter */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center bg-white dark:bg-gray-700 rounded-md px-3 py-2 flex-grow">
          <input
            type="text"
            placeholder="Search your contacts..."
            className="bg-transparent focus:outline-none w-full text-sm text-gray-900 dark:text-white"
          />
          <FaSearch className="text-gray-500 dark:text-gray-300 ml-2" />
        </div>
        <button className="p-2 rounded-md bg-gray-200 dark:bg-gray-600">
          <IoFilter size={16} className="text-gray-700 dark:text-gray-300" />
        </button>
      </div>

      {/* Messages */}
      <div className="space-y-2 overflow-y-auto">
        <MessageItem />
        <MessageItem />
      </div>
    </div>
  );
}

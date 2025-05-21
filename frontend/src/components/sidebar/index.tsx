import { FaSearch } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import MessageItem from "./MessageItem";
import Profile from "../profile";
import useToggleShow from "../../hooks/useToggleShow";

export default function Sidebar() {
  const { show, toggleVisibility } = useToggleShow();

  if (show) {
    return <Profile/>
  }
  return (
    <div className="w-full h-full flex flex-col p-4">
      {/* Avatar section */}
      <div 
        className="flex items-center mb-4 p-2 cursor-pointer transition-transform duration-300 hover:scale-105" 
        onClick={toggleVisibility}
      >
        <img
          src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
          alt="Avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <p className="ml-3 font-semibold text-sm">Mahmoud Saadaoui</p>
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

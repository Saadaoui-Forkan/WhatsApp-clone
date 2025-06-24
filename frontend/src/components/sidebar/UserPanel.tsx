import { useState } from "react";
import { useAuthStore } from "../../store/auth.store";
import { defaultAvatar } from "../../utils/constantes";
import Profile from "../profile";
import Search from "./Search";
import MessageItem from "./MessageItem";
import { FiFolder } from "react-icons/fi";

const UserPanel = () => {
  const { user, friends } = useAuthStore();
  const [showProfile, setShowProfile] = useState(false);

  if (showProfile) return <Profile onclose={() => setShowProfile(false)} />;

  return (
    <div className="w-full h-full flex flex-col p-4 overflow-y-auto">
      <div
        className="flex items-center mb-4 p-2 cursor-pointer transition-transform duration-300 hover:scale-105"
        onClick={() => setShowProfile(true)}
      >
        <img
          src={user?.photoProfile || defaultAvatar}
          alt="Avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="ml-3 flex flex-col">
          <p className="font-semibold text-sm">{user?.name}</p>
          {user?.bio && <p className="text-xs">{user.bio}</p>}
        </div>
      </div>
      <Search />
      <div className="space-y-2">
        {friends.length > 0 ? (
          friends.map((friend) => (
            <MessageItem
              key={friend.id}
              id={friend.id}
              name={friend.name}
              avatar={friend?.profilePicture?.secureUrl || defaultAvatar}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center mt-10 text-center text-gray-500">
            <FiFolder className="w-12 h-12 mb-3 text-gray-400" />
            <p className="text-sm font-medium">No contacts found...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPanel;

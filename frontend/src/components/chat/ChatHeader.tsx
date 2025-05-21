import { Logout } from "./Logout";

const ChatHeader = () => {
  return (
    <div className="p-4 border-b border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
      <Logout /> 
      <div className="flex items-center gap-3">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRapmZuEf4Nwup-GS-blhVEeNAs_sM22IUrDw&s"
          alt="Avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-sm">User Name</p>
          <p className="text-xs text-green-500">Online</p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;

import { useNavigate } from "react-router-dom";
import { MessageItemProps } from "../../types/message.types";

const MessageItem = ({ id, name, avatar }: MessageItemProps) => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/${id}`);
  }
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
      {/* <Avatar contact /> */}
      <div className="ml-3 flex-grow">
        <p className="font-medium text-sm">{name}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
          You: Lorem ipsum...
        </p>
      </div>
      <div className="ml-auto text-xs text-gray-400">hh:mm A</div>
    </div>
  );
};

export default MessageItem;

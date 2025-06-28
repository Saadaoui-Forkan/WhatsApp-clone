import { useNavigate } from "react-router-dom";
import { MessageItemProps } from "../../types/message.types";
import { useSocketStore } from "../../store/socket.store";
import { useMessageStore } from "../../store/message.store";
import { getReceiverMessages } from "../../utils/helpers";

const MessageItem = ({ id, name, avatar }: MessageItemProps) => {
  const { socket } = useSocketStore();
  const { messages, setMessages } = useMessageStore();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${id}`);

    socket?.emit("seen", id);

    setMessages(messages.map((message) =>
      message.senderId === id ? { ...message, seen: true } : message
    ));
  };

  const contactMessages = getReceiverMessages(messages, id);
  const unreadMessages = contactMessages.filter(
    (message) => !message.seen && message.receiverId !== id
  ).length;
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
      {unreadMessages > 0 && (
        <div className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          {unreadMessages}
        </div>
      )}
    </div>
  );
};

export default MessageItem;

import { ChatMessageProps } from "../../types/message.types";
import { formatMessageDate } from "../../utils/helpers";

const ChatMessage = ({ isSender = false, content, createdAt }: ChatMessageProps) => {
  return (
    <div className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-[20px] ${
          isSender
            ? "rounded-br-none bg-teal-600 text-white"
            : "rounded-bl-none bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white"
        }`}
      >
        <p className="text-sm mb-1">{content}</p>
        <p
          className={`text-xs text-right ${
            isSender ? "text-purple-200" : "text-gray-600 dark:text-gray-200"
          }`}
        >
          {formatMessageDate(createdAt)}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;

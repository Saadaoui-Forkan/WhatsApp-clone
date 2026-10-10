import { ChatMessageProps } from "../../types/message.types";
import { formatMessageDate } from "../../utils/helpers";

const ChatMessage = ({ isSender = false, content, createdAt, seen }: ChatMessageProps) => {
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
        <div className={`flex items-center justify-end gap-1 text-xs ${
          isSender ? "text-teal-100" : "text-gray-500 dark:text-gray-400"
        }`}>
          <span>{formatMessageDate(createdAt)}</span>
          {isSender && (
            <span className={seen ? "text-blue-200" : "opacity-60"}>
              {seen ? "✓✓" : "✓"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;

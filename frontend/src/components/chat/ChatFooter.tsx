import { TbSend } from "react-icons/tb";
import { InputClass } from "../../utils/classNames";
import { useState } from "react";
import { useSocketStore } from "../../store/socket.store";
import { useLocation } from "react-router-dom";

const ChatFooter = () => {
  const location = useLocation()
  const { socket } = useSocketStore()
  const [input, setInput] = useState('')
  const [error, setError] = useState(false);

  const receiverId = location.pathname.slice(1)
  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) {
      setError(true); 
      return;
    }

    socket?.emit("send_message", {
      receiverId,
      content: input
    })

    setInput("")
    setError(false)
  }
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  return (
    <div className="p-4 border-t border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
      <label htmlFor="chat" className="sr-only">
        Your message
      </label>
      <div className="flex items-center gap-2">
      <textarea
          id="chat"
          className={`${InputClass} h-12 resize-none ${
            error ? "border-red-500 focus:ring-red-500" : ""
          }`}
          placeholder="Your message..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (error && e.target.value.trim()) {
              setError(false); 
            }
          }}
          onKeyDown={handleKeyPress}
        />
        <button 
          className="p-2 rounded-md bg-purple-600 hover:bg-purple-700 transition"
          disabled={!input.trim()}
          onClick={sendMessage}
        >
          <TbSend size={20} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default ChatFooter;

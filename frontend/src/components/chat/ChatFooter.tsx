import { TbSend } from "react-icons/tb";
import { InputClass } from "../../utils/classNames";

const ChatFooter = () => {
  return (
    <div className="p-4 border-t border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
  <label htmlFor="chat" className="sr-only">Your message</label>
  <div className="flex items-center gap-2">
    <textarea
      id="chat"
      className={`${InputClass} h-12`}
      placeholder="Your message..."
    />
    <button className="p-2 rounded-md bg-purple-600 hover:bg-purple-700 transition">
      <TbSend size={20} className="text-white" />
    </button>
  </div>
</div>
  )
}

export default ChatFooter
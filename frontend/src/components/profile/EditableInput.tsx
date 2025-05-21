import { useState } from "react";
import { FaCheck, FaEdit } from "react-icons/fa";
import cn from "classnames";

export default function EditableInput() {
  const [isEditable, setIsEditable] = useState(false);

  return (
    <div className="flex items-center gap-2 border-b border-gray-300 dark:border-gray-600 pb-2">
      <input
        type="text"
        className={cn("w-full bg-transparent outline-none text-white py-1")}
        placeholder="Type here..."
      />
      {!isEditable ? (
        <FaEdit 
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer" 
          onClick={() => setIsEditable(true)}
        />
      ) : (
        <FaCheck className="
          text-green-500 cursor-pointer" 
        />
      )}
    </div>
  );
}

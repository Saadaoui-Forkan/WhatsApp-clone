import cn from "classnames";
import { useState } from "react";
import { FaCheck, FaEdit } from "react-icons/fa";
import { EditableInputProps } from "../../types/profile.types";

export default function EditableInput({value, onChange, id, updateUser}: EditableInputProps) {
  const [isEditable, setIsEditable] = useState(false);

  const handleEdit = () => {
    setIsEditable(true);
  }

  const handleNotEdit = () => {
    setIsEditable(false);
    updateUser?.() // Appelle onSave seulement s'il existe
  }

  return (
    <div className="flex items-center gap-2 border-b border-gray-300 dark:border-gray-600 pb-2">
      <input
        id={id}
        value={value}
        onChange={onChange}
        type="text"
        className={cn(
          "w-full bg-transparent outline-none py-1 px-2 text-sm rounded-md transition-colors duration-200",
          {
            "text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 border border-none":
              isEditable,
            "text-gray-400 dark:text-gray-500 cursor-not-allowed": !isEditable,
          }
        )}
        placeholder="Type here..."
        disabled={!isEditable}
      />
      {!isEditable ? (
        <FaEdit 
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer" 
          onClick={handleEdit}
        />
      ) : (
        <FaCheck 
          className="text-green-500 cursor-pointer" 
          onClick={handleNotEdit}
        />
      )}
    </div>
  );
}

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
    updateUser?.()
  }

  return (
    <div className="form-group">
      <div className="relative">
        <input
          id={id}
          value={value}
          onChange={onChange}
          type="text"
          className={cn(
            "w-full pr-10 py-2.5 bg-transparent outline-none text-sm rounded-xl transition-colors duration-200",
            {
              "text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 bg-surface-light dark:bg-surface-borderDark border border-surface-border dark:border-surface-borderDark":
                isEditable,
              "text-gray-500 dark:text-gray-400 cursor-not-allowed hover:bg-transparent": !isEditable,
            }
          )}
          placeholder="Type here..."
          disabled={!isEditable}
        />
        {!isEditable ? (
          <button
            type="button"
            onClick={handleEdit}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label="Edit"
          >
            <FaEdit size={18} />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNotEdit}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
            aria-label="Save"
          >
            <FaCheck size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
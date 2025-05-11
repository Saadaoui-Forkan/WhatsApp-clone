import { InputWithIconProps } from "../types/user.types";

const InputWithIcon = ({
  type = "text",
  name,
  placeholder,
  icon: Icon, 
}: InputWithIconProps) => {
  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 
                    focus:outline-none focus:border-emerald-500 dark:focus:border-purple-400 transition-colors duration-200"
        placeholder={placeholder}
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <Icon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
      </div>
    </div>
  );
};

export default InputWithIcon;
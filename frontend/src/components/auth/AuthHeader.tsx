import { AuthHeaderProps } from "../../types/user.types";

const AuthHeader = ({ title, subtitle, className = "" }: AuthHeaderProps) => {
  return (
    <div className={`text-center mb-8 ${className}`}>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
        {title}
      </h1>
      <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">{subtitle}</p>
    </div>
  );
};

export default AuthHeader;
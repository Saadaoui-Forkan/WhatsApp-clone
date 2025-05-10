import { AuthHeaderProps } from "../types/user.types";

const AuthHeader = ({ title, subtitle, className = "" }: AuthHeaderProps) => {
  return (
    <div className={`text-center mb-8 ${className}`}>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-emerald-100 mb-2">
        {title}
      </h1>
      <p className="text-gray-600 dark:text-gray-300">{subtitle}</p>
    </div>
  );
};

export default AuthHeader;

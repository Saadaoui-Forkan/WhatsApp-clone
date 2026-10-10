import { Link } from "react-router-dom";
import { AuthLinkProps } from "../../types/user.types";

const AuthLink = ({ to, link, text }: AuthLinkProps) => {
  return (
    <div className="mt-8 text-center">
      <p className="text-gray-500 dark:text-gray-400">
        {text}{" "}
        <Link
          to={to}
          className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
        >
          {link}
        </Link>
      </p>
    </div>
  );
};

export default AuthLink;
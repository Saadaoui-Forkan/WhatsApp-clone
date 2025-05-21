import { Link } from "react-router-dom";
import { AuthLinkProps } from "../../types/user.types";

const AuthLink = ({ to, link, text }: AuthLinkProps) => {
  return (
    <div className="mb-5 py-4 text-center">
      <p className="text-gray-600 dark:text-gray-300">
        {text}{" "}
        <Link
          to={to}
          className="text-emerald-700 dark:text-purple-300 hover:underline font-medium"
        >
          {link}
        </Link>
      </p>
    </div>
  );
};

export default AuthLink;

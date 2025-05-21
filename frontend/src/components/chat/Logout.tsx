import { RiLogoutCircleRLine } from "react-icons/ri";

export const Logout = () => {
  return (
    <button className="fixed top-4 right-12 md:right-2 p-2 rounded-md bg-gray-200 dark:bg-gray-700">
      <RiLogoutCircleRLine
        size={18}
        className="text-emerald-600 dark:text-purple-300"
      />
    </button>
  );
};

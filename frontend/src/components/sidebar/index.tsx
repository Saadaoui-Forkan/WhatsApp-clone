import { useState } from "react";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import UserPanel from "./UserPanel";

export default function Sidebar() {
  const [mobileSidebar, setMobileSidebar] = useState(false);

  const toggleMobileSidebar = () => {
    setMobileSidebar((prev) => !prev);
  };

  return (
    <>
      <div className="md:hidden fixed top-4 right-2 z-50">
        <button
          onClick={toggleMobileSidebar}
          className="p-2 rounded-md bg-gray-200 dark:bg-gray-700"
        >
          {mobileSidebar ? (
            <IoMdClose size={18} color="white" />
          ) : (
            <IoMdMenu size={18} color="white" />
          )}
        </button>
      </div>

      <div
        className={`${
          mobileSidebar ? "block" : "hidden"
        } md:block fixed md:relative w-full md:w-1/3 lg:w-1/4 h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-r border-gray-300 dark:border-gray-700`}
      >
        <UserPanel onItemClick={() => setMobileSidebar(false)}/>
      </div>
    </>
  );
}

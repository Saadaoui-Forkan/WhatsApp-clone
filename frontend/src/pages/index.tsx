import { useState } from "react";
import Sidebar from "../components/sidebar";
import { Outlet } from "react-router-dom";
import { IoMdClose, IoMdMenu } from "react-icons/io";

const Home = () => {
  const [mobileSidebar, setMobileSidebar] = useState(false);

  const toggleMobileSidebar = () => {
    setMobileSidebar(!mobileSidebar);
  };
  return (
    <div className="flex h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      
      <div className="md:hidden fixed top-4 right-2 z-50">
        <button
          onClick={toggleMobileSidebar}
          className="p-2 rounded-md bg-gray-200 dark:bg-gray-700"
        >
          {mobileSidebar ? (
            <IoMdClose size={18} color="white dark:color-gray-900" />
          ) : (
            <IoMdMenu size={18} color="white dark:color-gray-900 " />
          )}
        </button>
      </div>

      <div
        className={`${
          mobileSidebar ? "block" : "hidden"
        } md:block fixed md:relative w-full md:w-2/5 h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-r border-gray-300 dark:border-gray-700`}
      >
        <Sidebar />
      </div>

      <div className="flex-1 overflow-auto bg-white dark:bg-gray-900">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;

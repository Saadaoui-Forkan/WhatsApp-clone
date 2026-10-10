import { useState } from "react";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import UserPanel from "./UserPanel";

export default function Sidebar() {
  const [mobileSidebar, setMobileSidebar] = useState(true);

  const toggleMobileSidebar = () => {
    setMobileSidebar((prev) => !prev);
  };

  return (
    <>
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          onClick={toggleMobileSidebar}
          className="btn-icon"
          aria-label={mobileSidebar ? "Close menu" : "Open menu"}
        >
          {!mobileSidebar ? (
            <IoMdClose size={20} />
          ) : (
            <IoMdMenu size={20} />
          )}
        </button>
      </div>

      <div
        className={`${
          mobileSidebar ? "block" : "hidden"
        } md:block fixed md:relative w-full md:w-1/3 lg:w-1/4 h-full bg-white dark:bg-surface-cardDark border-r border-surface-border dark:border-surface-borderDark flex flex-col`}
      >
        <UserPanel onItemClick={() => setMobileSidebar(false)} />
      </div>
    </>
  );
}
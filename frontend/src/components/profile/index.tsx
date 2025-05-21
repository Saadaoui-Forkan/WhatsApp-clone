import EditableInput from "./EditableInput";
import { FaCamera } from "react-icons/fa";
import { IoMdReturnLeft } from "react-icons/io";
import Sidebar from "../sidebar";
import useToggleShow from "../../hooks/useToggleShow";

const Profile = () => {
  const { show, toggleVisibility } = useToggleShow();

  if (show) {
    return <Sidebar/>
  }
  return (
    <div className="w-full h-full p-4 overflow-auto">
      <div className="flex items-center mb-6">
        <button 
          className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 transition-transform duration-300 hover:scale-105"
          onClick={toggleVisibility}
        >
          <IoMdReturnLeft size={18} />
        </button>
        <p className="ml-4 font-semibold text-lg">Profile</p>
      </div>

      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          <img
            src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className="absolute bottom-0 right-0 bg-gray-700 p-2 rounded-full cursor-pointer">
            <FaCamera className="text-white" />
          </div>
        </div>
        <p className="text-sm mt-2 text-center">Change the profile picture</p>
        <input type="file" className="hidden" />
      </div>

      <form className="space-y-4">
        <EditableInput />
        <EditableInput />
        <EditableInput />
      </form>
    </div>
  );
};

export default Profile;

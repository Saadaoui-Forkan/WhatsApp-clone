import chat from "../../assets/chat.png"
import { Logout } from "./Logout";

const NoUserSelected = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full text-center p-4">
      <Logout /> 
      <div className="mb-6">
        <img src={chat} alt="logo" className="w-24 h-24 object-fill" />
      </div>
      <h1 className="text-xl font-semibold">Welcome to Chat App</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Select a user to start chatting
      </p>
    </div>
  );
};

export default NoUserSelected;

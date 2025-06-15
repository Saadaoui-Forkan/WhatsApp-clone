

const MessageItem = () => {
  return (
    <div className="flex items-center px-2 py-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition">
      <img
        src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
        alt="profilePicture"
        className="w-10 h-10 rounded-full object-cover"
      />
      {/* <Avatar contact /> */}
      <div className="ml-3 flex-grow">
        <p className="font-medium text-sm">sender</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
          You: Lorem ipsum...
        </p>
      </div>
      <div className="ml-auto text-xs text-gray-400">hh:mm A</div>
    </div>
  );
};

export default MessageItem;

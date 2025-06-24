import EditableInput from "./EditableInput";
import EditProfileImage from "./EditProfileImage";
import { IoMdReturnLeft } from "react-icons/io";
import { useState } from "react";
import { useAuthStore } from "../../store/auth.store";
import { useUpdateProfileInfo } from "../../hooks/useProfile";
import { toast } from "react-toastify";
import Spinner from "../Spinner";

type ProfileProps = {
  onclose: () => void;
};


const Profile = ({onclose}: ProfileProps) => {
  const { user, token, setUser } = useAuthStore();
  const { mutate, isPending } = useUpdateProfileInfo();

  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");

  const updateUser = () => {
    if (!user) return;

    mutate(
      {
        data: { name, bio },
        token,
        id: user.id,
      },
      {
        onSuccess: (data) => {
          setUser({
            ...user,
            name: data?.updateProfileInfo.name,
            bio: data?.updateProfileInfo.bio,
          });
          toast.success(data.message);
        },
        onError: () => {
          toast.error("An unexpected error occurred.");
        },
      }
    );
  };

  if (isPending) {
    return <Spinner />
  }
  return (
    <div className="w-full h-full p-4 overflow-auto">
      <div className="flex items-center mb-6">
        <button
          className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 transition-transform duration-300 hover:scale-105"
          onClick={onclose}
        >
          <IoMdReturnLeft size={18} />
        </button>
        <p className="ml-4 font-semibold text-lg">Profile</p>
      </div>
      <EditProfileImage />
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <EditableInput
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          updateUser={updateUser}
        />
        <EditableInput
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          id="bio"
          updateUser={updateUser}
        />
      </form>
    </div>
  );
};

export default Profile;

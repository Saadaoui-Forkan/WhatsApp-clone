import { FaCamera } from "react-icons/fa";
import { useUpdateProfilePhoto } from "../../hooks/useProfile";
import { useAuthStore } from "../../store/auth.store";
import { toast } from "react-toastify";
import Spinner from "../Spinner";
import { defaultAvatar } from "../../utils/constantes";

const EditProfileImage = () => {
  const { user, setUser } = useAuthStore();
  const { mutate, isPending } = useUpdateProfilePhoto();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      updateProfilePhoto(e.target.files[0]);
    }
  };

  const updateProfilePhoto = (selectedFile: File) => {
    if (!user) return
    mutate(
      {file: selectedFile, id:user?.id}, {
      onSuccess: (data) => {
        setUser({
          ...user,
          photoProfile: data?.updatedProfilePhoto.profilePicture.secureUrl,
        });
        toast.success(data?.message)
      },
      onError: (err) => {
        console.error(err)
        toast.error('An unexpected error occurred.')
      }
    })
  };

  if (isPending) {
    return (
      <Spinner small size="sm" />
    );
  }
  return (
    <div className="flex flex-col items-center mb-6">
      <div className="relative w-24 h-24">
        <img
          src={user?.photoProfile ? user?.photoProfile : defaultAvatar}
          alt="Avatar"
          className="w-full h-full rounded-full object-cover ring-4 ring-white dark:ring-surface-dark"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-200">
          <div className="text-white flex flex-col items-center justify-center gap-1">
            <FaCamera size={20} />
            <p className="text-xs font-medium">Edit</p>
          </div>
          <input
            type="file"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept="image/*"
          />
        </div>
      </div>
    </div>
  );
};

export default EditProfileImage;
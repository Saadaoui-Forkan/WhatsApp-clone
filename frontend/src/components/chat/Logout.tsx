import { RiLogoutCircleRLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthStore } from "../../store/auth.store";
import { useLogout } from "../../hooks/useAuth";
import Spinner from "../Spinner";

export const Logout = () => {
  const navigate = useNavigate()
  const { setUser, setToken, token } = useAuthStore()
  const {mutate: logout, isPending} = useLogout()

  const handleLogout = () => {
    logout(token, {
      onSuccess: () => {
        setUser(null);
        setToken("");
        toast.success("Logged out successfully");
        navigate("/login"); 
      },
      onError: () => {
        toast.error("Logout failed");
      },
    });
  };

  if (isPending) {
    return <Spinner/>
  }
  
  return (
    <button className="fixed top-4 right-12 md:right-2 p-2 rounded-md bg-gray-200 dark:bg-gray-700">
      <RiLogoutCircleRLine
        size={18}
        className="text-emerald-600 dark:text-purple-300"
        onClick={handleLogout}
      />
    </button>
  );
};

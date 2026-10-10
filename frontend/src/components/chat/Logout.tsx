import { RiLogoutCircleRLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthStore } from "../../store/auth.store";
import { useLogout } from "../../hooks/useAuth";
import Spinner from "../Spinner";

export const Logout = () => {
  const navigate = useNavigate()
  const { setUser } = useAuthStore()
  const {mutate: logout, isPending} = useLogout()

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        setUser(null);
        toast.success("Logged out successfully");
        navigate("/login"); 
      },
      onError: () => {
        toast.error("Logout failed");
      },
    });
  };

  if (isPending) {
    return <Spinner small size="sm" />
  }
  
  return (
    <button 
      onClick={handleLogout}
      className="btn-icon text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/30"
      aria-label="Log out"
    >
      <RiLogoutCircleRLine size={20} />
    </button>
  );
};
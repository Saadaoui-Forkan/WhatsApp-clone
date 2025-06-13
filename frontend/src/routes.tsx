import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useAuthStore } from "./store/auth.store";
import NotFound from "./components/NotFound";
import NotUserSelected from "./components/chat/NoUserSelected";
import Chat from "./components/chat";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

const Router = () => {
  const { token } = useAuthStore();

  const router = createBrowserRouter([
    {
      path: "/",
      element: token ? <Home /> : <Navigate to="/login" />,
      children: [
        {
          path:"",
          element: <NotUserSelected/>
        },
        {
          path:"receiverId",
          element: <Chat/>
        }
      ]
    },
    {
      path: "register",
      element: !token ? <Register /> : <Navigate to="/" />,
    },
    {
      path: "users/:userId/verify/:token",
      element: !token ? <VerifyEmail /> : <Navigate to="/" />,
    },
    {
      path: "login",
      element: !token ? <Login /> : <Navigate to="/"/>,
    },
    {
      path: "forgot-password",
      element: !token ? <ForgotPassword /> : <Navigate to="/"/>,
    },
    {
      path: "reset-password/:userId/:token",
      element: !token ? <ResetPassword /> : <Navigate to="/"/>,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;

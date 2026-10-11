import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import Home from "./pages";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useAuthStore } from "./store/auth.store";
import NotFound from "./components/NotFound";
import RouteError from "./components/RouteError";
import NotUserSelected from "./components/chat/NoUserSelected";
import Chat from "./components/chat";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import api from "./api/axios";
import { normalizeUser } from "./utils/helpers";

// Loader for protected routes - fetches current user from /api/users/me
const requireAuth = async () => {
  try {
    const res = await api.get("/users/me");
    const user = normalizeUser(res.data.user);
    useAuthStore.getState().setUser(user);
    return user;
  } catch {
    useAuthStore.getState().clearAuth();
    return redirect("/login");
  }
};

// Loader for public routes (login, register) - redirects if already authenticated
const redirectIfAuth = async () => {
  try {
    const res = await api.get("/users/me");
    const user = normalizeUser(res.data.user);
    useAuthStore.getState().setUser(user);
    return redirect("/");
  } catch {
    // Not authenticated, allow access
    return null;
  }
};

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      loader: requireAuth,
      errorElement: <RouteError />,
      children: [
        {
          path: "",
          element: <NotUserSelected />,
        },
        {
          path: ":receiverId",
          element: <Chat />,
        },
      ],
    },
    {
      path: "register",
      element: <Register />,
      loader: redirectIfAuth,
      errorElement: <RouteError />,
    },
    {
      path: "users/:userId/verify/:token",
      element: <VerifyEmail />,
      loader: redirectIfAuth,
      errorElement: <RouteError />,
    },
    {
      path: "login",
      element: <Login />,
      loader: redirectIfAuth,
      errorElement: <RouteError />,
    },
    {
      path: "forgot-password",
      element: <ForgotPassword />,
      loader: redirectIfAuth,
      errorElement: <RouteError />,
    },
    {
      path: "reset-password/:userId/:token",
      element: <ResetPassword />,
      loader: redirectIfAuth,
      errorElement: <RouteError />,
    },
    {
      path: "*",
      element: <NotFound />,
      errorElement: <RouteError />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
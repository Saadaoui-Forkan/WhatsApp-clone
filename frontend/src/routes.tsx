import {
  createBrowserRouter,
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
import api from "./api/axios";

// Loader for protected routes - fetches current user from /api/users/me
const requireAuth = async () => {
  try {
    const res = await api.get("/users/me");
    const { user } = res.data;
    useAuthStore.getState().setUser(user);
    return user;
  } catch {
    useAuthStore.getState().clearAuth();
    throw new Response("", { status: 401, statusText: "Unauthorized" });
  }
};

// Loader for public routes (login, register) - redirects if already authenticated
const redirectIfAuth = async () => {
  try {
    const res = await api.get("/users/me");
    const { user } = res.data;
    useAuthStore.getState().setUser(user);
    throw new Response("", { status: 302, headers: { Location: "/" } });
  } catch (e) {
    if (e instanceof Response) throw e;
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
    },
    {
      path: "users/:userId/verify/:token",
      element: <VerifyEmail />,
      loader: redirectIfAuth,
    },
    {
      path: "login",
      element: <Login />,
      loader: redirectIfAuth,
    },
    {
      path: "forgot-password",
      element: <ForgotPassword />,
      loader: redirectIfAuth,
    },
    {
      path: "reset-password/:userId/:token",
      element: <ResetPassword />,
      loader: redirectIfAuth,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
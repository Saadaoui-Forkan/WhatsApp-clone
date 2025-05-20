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

const Router = () => {
  const { token } = useAuthStore();

  const router = createBrowserRouter([
    {
      path: "/",
      element: token ? <Home /> : <Navigate to="/login" />,
    },
    {
      path: "register",
      element: !token ? <Register /> : <Navigate to="/" />,
    },
    {
      path: "login",
      element: !token ? <Login /> : <Navigate to="/"/>,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;

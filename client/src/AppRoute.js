import { Navigate } from "react-router-dom";

const AppRoute = ({ user, children, redirect }) => {
    if (!user) {
        return <Navigate to={redirect} />;
    }

    return children;
};

export default AppRoute
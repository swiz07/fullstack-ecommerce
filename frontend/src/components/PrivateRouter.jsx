import {Navigate, Outlet} from "react-router-dom";

const isAuthenticated = () => !! localStorage.getItem("access_token");

export const PrivateRouter = ({redirectTo = "/login"}) => {
    return isAuthenticated() ? <Outlet /> : <Navigate to={redirectTo} replace/>;
}

export default PrivateRouter;
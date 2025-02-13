import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export const ProtectedRoute = () => {
    const { isUserAuth } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isUserAuth) {
            navigate("/user/login", { replace: true });
        }
    }, [isUserAuth, navigate]); 

    if (!isUserAuth) return null; 

    return <Outlet />;
};

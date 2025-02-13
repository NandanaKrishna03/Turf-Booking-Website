import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export const ProtectedRouteManager = () => {
    const navigate = useNavigate(); // ✅ Always called at the top
    const managerState = useSelector((state) => state.manager);
    const isManagerAuth = managerState?.isManagerAuth || false; // ✅ Avoid destructuring undefined

    useEffect(() => {
        if (!isManagerAuth) {
            navigate("/manager/login");
        }
    }, [isManagerAuth, navigate]); // ✅ Always runs, no conditions on hook placement

    if (!isManagerAuth) return null;

    return <Outlet />;
};

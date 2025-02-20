import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { saveManager } from "../redux/features/managerSlice";
 // Import action

export const ProtectedRouteManager = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isManagerAuth } = useSelector((state) => state.manager);

    useEffect(() => {
        const token = localStorage.getItem("managerToken");
        const managerData = JSON.parse(localStorage.getItem("managerData"));

        if (token && managerData && !isManagerAuth) {
            dispatch(saveManager(managerData)); // Restore authentication from localStorage
        } else if (!token) {
            navigate("/manager/login", { replace: true });
        }
    }, [isManagerAuth, navigate, dispatch]);

    if (!isManagerAuth) return null; // Prevents flickering before redirect

    return <Outlet />;
};

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export const ProtectedRouteAdmin = () => {
    const navigate = useNavigate();
    const adminState = useSelector((state) => state.admin);
    const isAdminAuth = adminState?.adminData || false;

    useEffect(() => {
        if (!isAdminAuth) {
            navigate("/admin/login");
        }
    }, [isAdminAuth, navigate]);

    if (!isAdminAuth) return null;

    return <Outlet />;
};
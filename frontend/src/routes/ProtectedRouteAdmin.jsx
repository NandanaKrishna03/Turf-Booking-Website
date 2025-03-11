import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export const ProtectedRouteAdmin = () => {
  const navigate = useNavigate();
  const isAdminAuth = useSelector((state) => state.admin.isAdminAuth);

  useEffect(() => {
    if (!isAdminAuth) {
      navigate("/admin/login", { replace: true });
    }
  }, [isAdminAuth, navigate]);

  return isAdminAuth ? <Outlet /> : null;
};

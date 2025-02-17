import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export const ProtectedRouteAdmin = () => {
  const navigate = useNavigate();
  const adminState = useSelector((state) => state.admin);
  const isAdminAuth = adminState?.isAdminAuth || false;  // Use isAdminAuth to check authentication

  useEffect(() => {
    if (!isAdminAuth) {
      // If not authenticated, navigate to login
      navigate("/admin/login");
    }
  }, [isAdminAuth, navigate]);

  // If not authenticated, return null to prevent rendering the protected route
  if (!isAdminAuth) return null;

  return <Outlet />;
};

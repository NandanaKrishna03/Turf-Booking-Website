import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { AdminHeader } from "../components/admin/AdminHeader"; // ✅ Admin header
import { Header } from "../components/user/Header"; // Fallback for non-admin users
import { Footer } from "../components/user/Footer";
import ScrollToTop from "../components/shared/ScrollToTop";

const AdminLayout = () => {
    const isAdminAuth = useSelector((state) => state.admin.isAdminAuth); // ✅ Fetch admin authentication state

    return (
        <div>
            <ScrollToTop />
            {isAdminAuth ? <AdminHeader /> : <Header />} {/* ✅ Show AdminHeader if authenticated */}
            <div className="bg-neutral min-h-screen text-neutral-content">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default AdminLayout;

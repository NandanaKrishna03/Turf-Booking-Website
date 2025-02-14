import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { ManagerHeader } from "../components/manager/Managerheader";
import { Header } from "../components/manager/Header"; // User header (if needed)
import { Footer } from "../components/user/Footer";
import ScrollToTop from "../components/shared/ScrollToTop";
import Darkmode from "../components/shared/Darkmode";

const ManagerLayout = () => {
    const isManagerAuth = useSelector((state) => state.manager.isManagerAuth);

    return (
        <div>
             <ScrollToTop />
            {isManagerAuth ? <ManagerHeader /> : <Header />}
            <div className="bg-neutral min-h-screen text-neutral-content">
                <Outlet />
            </div>
            <Footer />
            <Darkmode/>
        </div>
    );
};

export default ManagerLayout;

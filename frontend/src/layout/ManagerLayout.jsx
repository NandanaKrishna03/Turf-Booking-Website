import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { ManagerHeader } from "../components/manager/Managerheader";
import { Header } from "../components/user/Header"; // User header (if needed)
import { Footer } from "../components/user/Footer";

const ManagerLayout = () => {
    const isManagerAuth = useSelector((state) => state.manager.isManagerAuth);

    return (
        <div>
            {isManagerAuth ? <ManagerHeader /> : <Header />}
            <div className="bg-neutral min-h-screen text-neutral-content">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default ManagerLayout;

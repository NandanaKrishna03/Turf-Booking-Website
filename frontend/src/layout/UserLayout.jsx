import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { UserHeader } from "../components/user/Userheader"; // Authenticated User Header
import { Header } from "../components/user/Header";
import { Footer } from "../components/user/Footer";
import ScrollToTop from "../components/shared/ScrollToTop";


const UserLayout = () => {
    const { isUserAuth } = useSelector((state) => state.user);

    return (
        <div>
            <ScrollToTop />
            {isUserAuth ? <UserHeader /> : <Header />}
            <Outlet /> {/* Renders the page content */}
            <Footer/>
        </div>
    );
};

export default UserLayout;

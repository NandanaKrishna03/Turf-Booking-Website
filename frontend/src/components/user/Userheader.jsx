import { useState, useContext } from "react";
import { CircleUser, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Darkmode from "../shared/Darkmode";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../../config/axiosInstance";
import { clearUser } from "../../redux/features/userSlice";
import { ThemeContext } from "../../context/ThemeContext"; // Import ThemeContext

export const UserHeader = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    // Get theme from context
    const { theme } = useContext(ThemeContext);

    const handleLogOut = async () => {
        try {
            await axiosInstance.get("/user/logout");
            dispatch(clearUser());
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {/* Header */}
            <div className={`fixed top-0 left-0 w-full flex justify-between items-center px-14 h-20 shadow-2xl z-50 transition-colors duration-300 ${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}`}>
                <Link to={"/"}>
                    <img src="https://res.cloudinary.com/dk1kmtpwe/image/upload/v1740064302/Screenshot_245_ru80e2.png" alt="Logo" width="200" />
                </Link>

                {/* Desktop Menu */}
                <div className="lg:flex hidden items-center gap-8 text-lg font-medium">
                    <Link to="/" className="hover:text-blue-500 transition">Home</Link>
                    <Link to="/about" className="hover:text-blue-500 transition">About</Link>
                    <Link to="/turfs" className="hover:text-blue-500 transition">Turfs</Link>
                    <Link to="/user/profile">
                        <CircleUser className="cursor-pointer text-xl" />
                    </Link>
                    <Darkmode />
                    <button className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-red-400 transition" onClick={handleLogOut}>
                        Logout
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button onClick={() => setMenuOpen(true)} className={`p-2 rounded-md transition-colors duration-300 ${theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-200 text-black"} lg:hidden`}>
                    <Menu size={28} />
                </button>
            </div>

            {/* Right Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full w-80 shadow-2xl z-[100] transition-transform duration-300 lg:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"} ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}
            >
                {/* Sidebar Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-300 dark:border-gray-700">
                    <h2 className="text-xl font-semibold">Menu</h2>
                    <button onClick={() => setMenuOpen(false)} className="p-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700">
                        <X size={24} />
                    </button>
                </div>

                {/* Dark Mode Toggle & Logout */}
                <div className="px-6 py-5 flex flex-col gap-4 border-b border-gray-300 dark:border-gray-700">
                    <div className="flex justify-start">
                        <Darkmode />
                    </div>
                    <button className="w-full py-3 text-center font-semibold rounded-lg bg-blue-600 text-white hover:bg-red-500 transition" onClick={handleLogOut}>
                        Logout
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="mt-4 px-6">
                    <ul className="flex flex-col gap-6 text-lg font-medium">
                        <Link to="/" className="hover:text-blue-500 transition" onClick={() => setMenuOpen(false)}>
                            <li>Home</li>
                        </Link>
                        <Link to="/about" className="hover:text-blue-500 transition" onClick={() => setMenuOpen(false)}>
                            <li>About</li>
                        </Link>
                        <Link to="/turfs" className="hover:text-blue-500 transition" onClick={() => setMenuOpen(false)}>
                            <li>Turfs</li>
                        </Link>
                        <Link to="/user/profile" className="hover:text-blue-500 transition" onClick={() => setMenuOpen(false)}>
                            <li>Profile</li>
                        </Link>
                    </ul>
                </nav>
            </div>

            {/* Overlay */}
            {menuOpen && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-black/50 z-[99] lg:hidden"
                    onClick={() => setMenuOpen(false)}
                ></div>
            )}
        </>
    );
};

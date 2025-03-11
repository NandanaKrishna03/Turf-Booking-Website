import { useState, useContext } from "react";
import { Menu, X, CircleUser } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Darkmode from "../shared/Darkmode";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../../config/axiosInstance";
import { clearManager } from "../../redux/features/managerSlice";
import { ThemeContext } from "../../context/ThemeContext";

export const ManagerHeader = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { theme } = useContext(ThemeContext);
    const isDarkMode = theme === "dark";

    const handleLogOut = async () => {
        try {
            await axiosInstance.get("/manager/logout");
            dispatch(clearManager());
            navigate("/manager/login");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className={`fixed top-0 left-0 w-full flex justify-between items-center px-10 h-20 shadow-2xl z-50 transition-all duration-300 ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
                <Link to="/manager/dashboard">
                    <img src="https://res.cloudinary.com/dk1kmtpwe/image/upload/v1740064302/Screenshot_245_ru80e2.png" alt="Logo" width="200" />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex gap-10 items-center font-semibold">
                    <Link to="/manager/dashboard" className="hover:text-blue-500 transition">Dashboard</Link>
                    <Link to="/manager/turfs" className="hover:text-blue-500 transition">My Turfs</Link>
                    <Link to="/manager/bookings" className="hover:text-blue-500 transition">Bookings</Link>
                </nav>

                <div className="hidden lg:flex gap-6 items-center">
                    {/* Profile Dropdown */}
                    <div className="relative">
                        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                            <CircleUser size={28} />
                        </button>
                        {isDropdownOpen && (
                            <div className={`absolute right-0 mt-2 w-48 border rounded-lg shadow-md transition-all ${isDarkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-black border-gray-300"}`}>
                                <Link to="/manager/profile" className="block px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-700" onClick={() => setIsDropdownOpen(false)}>Profile</Link>
                                <Link to="/manager/profile-update" className="block px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-700" onClick={() => setIsDropdownOpen(false)}>Update Profile</Link>
                            </div>
                        )}
                    </div>
                    <Darkmode />
                    <button className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-red-400 transition" onClick={handleLogOut}>Logout</button>
                </div>

                {/* Mobile Menu Button */}
                <button onClick={() => setMenuOpen(true)} className={`p-2 rounded-md transition-all lg:hidden ${isDarkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black"}`}>
                    <Menu size={28} />
                </button>
            </div>

            {/* Mobile Sidebar */}
            <div className={`fixed top-0 right-0 h-full w-72 shadow-2xl z-[100] transition-transform duration-300 lg:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"} ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-300 dark:border-gray-700">
                    <h2 className="text-xl font-semibold">Menu</h2>
                    <button onClick={() => setMenuOpen(false)} className="p-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700">
                        <X size={24} />
                    </button>
                </div>

                <div className="px-6 py-5 flex flex-col gap-4 border-b border-gray-300 dark:border-gray-700">
                    <div className="flex justify-start">
                        <Darkmode />
                    </div>
                    <button className="w-full py-3 text-center font-semibold rounded-lg bg-blue-600 text-white hover:bg-red-500 transition" onClick={handleLogOut}>Logout</button>
                </div>

                <nav className="mt-4 px-6">
                    <ul className="flex flex-col gap-6 text-lg font-medium">
                        <Link to="/manager/dashboard" className="hover:text-blue-500 transition" onClick={() => setMenuOpen(false)}>
                            <li>Dashboard</li>
                        </Link>
                        <Link to="/manager/turfs" className="hover:text-blue-500 transition" onClick={() => setMenuOpen(false)}>
                            <li>My Turfs</li>
                        </Link>
                        <Link to="/manager/bookings" className="hover:text-blue-500 transition" onClick={() => setMenuOpen(false)}>
                            <li>Bookings</li>
                        </Link>
                        <Link to="/manager/profile" className="hover:text-blue-500 transition" onClick={() => setMenuOpen(false)}>
                            <li>Profile</li>
                        </Link>
                    </ul>
                </nav>
            </div>

            {/* Overlay */}
            {menuOpen && <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-[99] lg:hidden" onClick={() => setMenuOpen(false)}></div>}
        </>
    );
};

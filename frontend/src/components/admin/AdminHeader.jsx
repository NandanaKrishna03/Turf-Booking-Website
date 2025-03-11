import { useState, useContext } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearAdmin } from "../../redux/features/adminSlice";
import toast from "react-hot-toast";
import Darkmode from "../shared/Darkmode";
import { ThemeContext } from "../../context/ThemeContext";

export const AdminHeader = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [menuOpen, setMenuOpen] = useState(false);
    const { theme } = useContext(ThemeContext);

    const handleLogout = () => {
        dispatch(clearAdmin());
        localStorage.removeItem("adminToken");
        toast.success("Logged out successfully");
        navigate("/admin/login");
    };

    return (
        <>
            {/* Header */}
            <div className={`fixed top-0 left-0 w-full flex justify-between items-center px-14 h-20 shadow-2xl z-50 transition-colors duration-300 ${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}`}>
                <h1 className="text-2xl font-bold">Admin Panel</h1>
                
                {/* Desktop Menu */}
                <div className="lg:flex hidden items-center gap-8 text-lg font-medium">
                    <Link to="/admin/dashboard" className="hover:text-blue-500 transition">Dashboard</Link>
                    <Link to="/admin/users" className="hover:text-blue-500 transition">Users</Link>
                    <Link to="/admin/managers" className="hover:text-blue-500 transition">Managers</Link>
                    <Darkmode />
                    <button className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition" onClick={handleLogout}>
                        Logout
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button onClick={() => setMenuOpen(true)} className={`p-2 rounded-md transition-colors duration-300 ${theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-200 text-black"} lg:hidden`}>
                    <Menu size={28} />
                </button>
            </div>

            {/* Right Sidebar */}
            <div className={`fixed top-0 right-0 h-full w-80 shadow-2xl z-[100] transition-transform duration-300 lg:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"} ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
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
                    <button className="w-full py-3 text-center font-semibold rounded-lg bg-red-600 text-white hover:bg-red-500 transition" onClick={handleLogout}>
                        Logout
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="mt-4 px-6">
                    <ul className="flex flex-col gap-6 text-lg font-medium">
                        <Link to="/admin/dashboard" className="hover:text-blue-500 transition" onClick={() => setMenuOpen(false)}>
                            <li>Dashboard</li>
                        </Link>
                        <Link to="/admin/users" className="hover:text-blue-500 transition" onClick={() => setMenuOpen(false)}>
                            <li>Users</li>
                        </Link>
                        <Link to="/admin/managers" className="hover:text-blue-500 transition" onClick={() => setMenuOpen(false)}>
                            <li>Managers</li>
                        </Link>
                    </ul>
                </nav>
            </div>

            {/* Overlay */}
            {menuOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-[99] lg:hidden" onClick={() => setMenuOpen(false)}></div>
            )}
        </>
    );
};

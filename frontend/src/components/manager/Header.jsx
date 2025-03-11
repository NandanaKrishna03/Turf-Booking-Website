import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";

export const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { theme } = useContext(ThemeContext);

    return (
        <>
            {/* Header */}
            <div className={`fixed top-0 left-0 w-full flex justify-between items-center px-14 h-20 shadow-2xl z-50 transition-colors duration-300 ${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}`}>
                <Link to={"/"}>
                    <img src="https://res.cloudinary.com/dk1kmtpwe/image/upload/v1740064302/Screenshot_245_ru80e2.png" alt="Logo" width="200" />
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden lg:flex items-center gap-10 text-md font-medium">
                    <Link to="/" className="hover:text-blue-500 transition">Home</Link>
                    <Link to="/about" className="hover:text-blue-500 transition">About</Link>
                    <Link to="/turfs" className="hover:text-blue-500 transition">Turfs</Link>
                </nav>

                <Link to="/manager/signup" className="hidden lg:inline-block px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                    Join Us
                </Link>

                {/* Mobile Menu Button */}
                <button onClick={() => setMenuOpen(true)} className={`p-2 rounded-md transition-colors duration-300 ${theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-200 text-black"} lg:hidden`}>
                    <Menu size={28} />
                </button>
            </div>

            {/* Right Sidebar (Mobile Menu) */}
            <div className={`fixed top-0 right-0 h-full w-64 shadow-2xl z-[100] transition-transform duration-300 lg:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"} ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
                {/* Sidebar Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-300 dark:border-gray-700">
                    <h2 className="text-xl font-semibold">Menu</h2>
                    <button onClick={() => setMenuOpen(false)} className="p-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700">
                        <X size={24} />
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
                    </ul>
                </nav>

                <div className="mt-6 px-6">
                    <Link to="/manager/signup" className="w-full block text-center px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition" onClick={() => setMenuOpen(false)}>
                        Join Us
                    </Link>
                </div>
            </div>

            {/* Overlay */}
            {menuOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-[99] lg:hidden" onClick={() => setMenuOpen(false)}></div>
            )}
        </>
    );
};

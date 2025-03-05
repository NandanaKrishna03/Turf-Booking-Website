import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Darkmode from "../shared/Darkmode";
import { Menu, X } from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";

export const Header = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { theme } = useContext(ThemeContext);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-[100vh] object-cover z-[-1]"
            >
                <source
                    src="https://res.cloudinary.com/dk1kmtpwe/video/upload/v1740061791/52177-467701518_bgjiid.mp4"
                    type="video/mp4"
                />
            </video>

            {/* Header */}
            <div
                className={`fixed top-0 left-0 w-full flex justify-between items-center px-14 h-20 shadow-2xl z-50 transition-colors duration-500 ${
                    scrollY > 50
                        ? theme === "dark"
                            ? "bg-gray-900 text-white"
                            : "bg-white text-black"
                        : "bg-transparent text-white"
                }`}
            >
                <Link to={"/"}>
                    <img
                        src="https://res.cloudinary.com/dk1kmtpwe/image/upload/v1740064302/Screenshot_245_ru80e2.png"
                        alt="Logo"
                        width="200"
                    />
                </Link>

                {/* Desktop Menu */}
                <div className="lg:flex hidden items-center gap-8 text-lg font-medium">
                    <Link to="/" className="hover:text-blue-500 transition">Home</Link>
                    <Link to="/about" className="hover:text-blue-500 transition">About</Link>
                    <Link to="/turfs" className="hover:text-blue-500 transition">Turfs</Link>
                    <button
                        className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        onClick={() => navigate("user/signup")}
                    >
                        Join Us
                    </button>
                    <Darkmode />
                </div>

                {/* Mobile Menu Button */}
                <button onClick={() => setSidebarOpen(true)} className={`p-2 rounded-md lg:hidden`}>
                    <Menu size={28} />
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full w-80 shadow-2xl z-[100] transition-transform duration-300 lg:hidden ${
                    sidebarOpen ? "translate-x-0" : "translate-x-full"
                } ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}
            >
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-300 dark:border-gray-700">
                    <h2 className="text-xl font-semibold">Menu</h2>
                    <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-md">
                        <X size={24} />
                    </button>
                </div>

                {/* Join Us & Dark Mode */}
                <div className="px-6 py-5 flex flex-col gap-4 border-b border-gray-300 dark:border-gray-700">
                    <button
                        className="w-full py-3 text-center font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                        onClick={() => {
                            navigate("user/signup");
                            setSidebarOpen(false);
                        }}
                    >
                        Join Us
                    </button>
                    <div className="flex justify-start">
                        <Darkmode />
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="mt-4 px-6">
                    <ul className="flex flex-col gap-6 text-lg font-medium">
                        <Link to="/" className="hover:text-blue-500 transition" onClick={() => setSidebarOpen(false)}>
                            <li>Home</li>
                        </Link>
                        <Link to="/about" className="hover:text-blue-500 transition" onClick={() => setSidebarOpen(false)}>
                            <li>About</li>
                        </Link>
                        <Link to="/turfs" className="hover:text-blue-500 transition" onClick={() => setSidebarOpen(false)}>
                            <li>Turfs</li>
                        </Link>
                    </ul>
                </nav>
            </div>

            {/* Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-black/50 z-[99] lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}
        </>
    );
};

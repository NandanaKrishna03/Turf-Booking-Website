import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { MyBookings } from "./MyBooking";

export const Profile = () => {
    const [profileData] = useFetch("/user/profile");
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);

    // State to handle active tab
    const [activeTab, setActiveTab] = useState("all");

    return (
        <div className={`min-h-screen pt-20  flex ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}>
            {/* Sidebar */}
            <aside className={`w-1/4 min-h-screen p-6 flex flex-col items-center shadow-lg ${theme === "light" ? "bg-white text-gray-800" : "bg-gray-800 text-white"}`}>
                {/* Profile Picture & Info */}
                <img
                    src={profileData?.profilepic || "/default-avatar.png"}
                    className="w-24 h-24 rounded-full shadow-lg border-2 border-gray-300"
                    alt="Profile"
                />
                
                <h2 className="mt-4 text-lg font-semibold">{profileData?.name || "Your Name"}</h2>
                <h2 className="mt-4 text-lg font-semibold">{profileData?.phoneNumber || "Your Phone"}</h2>

                {/* Navigation Links */}
                <nav className="mt-6 w-full">
                    <button onClick={() => navigate("/user/get-bookings")} className="w-full flex items-center px-4 py-2 bg-green-500 text-white rounded-md">
                        📋 All Bookings
                    </button>
                    <button onClick={() => navigate("/user/profile-update")} className="w-full flex items-center px-4 py-2 mt-2 hover:bg-gray-200 rounded-md">
                        ✏️ Edit Profile
                    </button>
                    <button onClick={() => navigate("/user/change-password")} className="w-full flex items-center px-4 py-2 mt-2 hover:bg-gray-200 rounded-md">
                        🔒 Change Password
                    </button>
                    <button onClick={() => navigate("/user/account-deactivate")} className="w-full flex items-center px-4 py-2 mt-2 hover:bg-gray-200 rounded-md">
                        ❌ Deactivate Account
                    </button>
                    <button onClick={() => navigate("/turfs")} className="w-full flex items-center px-4 py-2 mt-2 hover:bg-gray-200 rounded-md">
                        🏟️ My Turfs
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="w-3/4 p-6">
                <div className={`p-6 rounded-lg shadow-md ${theme === "light" ? "bg-white" : "bg-gray-800"}`}>
                    
                    {/* Tabs */}
                    <div className="flex border-b pb-2">
                        <button
                            className={`px-4 py-2 ${activeTab === "all" ? "bg-green-500 text-white rounded-t-md" : "text-gray-500 hover:text-gray-800"}`}
                            onClick={() => setActiveTab("all")}
                        >
                            All Bookings
                        </button>
                        
                    </div>

                    {/* Content Based on Active Tab */}
                    <div className="mt-4">
                        {activeTab === "all" && <MyBookings />}
                        {activeTab === "cancelled" && <MyBookings showCancelledOnly />}
                    </div>
                </div>
            </main>
        </div>
    );
};


import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { MyBookings } from "./MyBooking";
import { axiosInstance } from "../../config/axiosInstance";

export const Profile = () => {
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);

    // Fetch user profile with error handling
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch user data
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axiosInstance.get("/user/profile", { withCredentials: true });
                setProfileData(response.data);
            } catch (err) {
                console.error("Error fetching profile:", err);
                setError(err.response?.status === 401 ? "Unauthorized" : "Failed to load data");
                if (err.response?.status === 401) {
                    navigate("/login"); // Redirect to login if unauthorized
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    // State to handle active tab
    const [activeTab, setActiveTab] = useState("all");

    // Show loading state
    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    // Show error message if there's an issue
    if (error) {
        return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
    }

    return (
        <div className={`min-h-screen flex ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}>
            {/* Sidebar */}
            <aside className={`w-1/4 min-h-screen p-6 flex flex-col items-center shadow-lg ${theme === "light" ? "bg-white text-gray-800" : "bg-gray-800 text-white"}`}>
                {/* Profile Picture & Info */}
                <img
                    src={profileData?.profilepic || "/default-avatar.png"}
                    className="w-24 h-24 rounded-full shadow-lg border-2 border-gray-300"
                    alt="Profile"
                />

                <h2 className="mt-4 text-lg font-semibold">{profileData?.name || "Your Name"}</h2>
                <h2 className="mt-2 text-sm text-gray-600">{profileData?.phoneNumber || "Your Phone"}</h2>

                {/* Navigation Links */}
                <nav className="mt-6 w-full">
                    <button onClick={() => navigate("/user/get-bookings")} className="w-full flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                        📋 All Bookings
                    </button>
                    <button onClick={() => navigate("/user/profile-update")} className="w-full flex items-center px-4 py-2 mt-2 bg-gray-200 hover:bg-gray-300 rounded-md">
                        ✏️ Edit Profile
                    </button>
                    <button onClick={() => navigate("/user/change-password")} className="w-full flex items-center px-4 py-2 mt-2 bg-gray-200 hover:bg-gray-300 rounded-md">
                        🔒 Change Password
                    </button>
                    <button onClick={() => navigate("/user/account-deactivate")} className="w-full flex items-center px-4 py-2 mt-2 bg-gray-200 hover:bg-gray-300 rounded-md">
                        ❌ Deactivate Account
                    </button>
                    <button onClick={() => navigate("/turfs")} className="w-full flex items-center px-4 py-2 mt-2 bg-gray-200 hover:bg-gray-300 rounded-md">
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
                        <button
                            className={`ml-2 px-4 py-2 ${activeTab === "cancelled" ? "bg-red-500 text-white rounded-t-md" : "text-gray-500 hover:text-gray-800"}`}
                            onClick={() => setActiveTab("cancelled")}
                        >
                            Cancelled Bookings
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

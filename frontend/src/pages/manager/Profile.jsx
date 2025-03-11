import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export const ManagerProfile = () => {
    const [profileData] = useFetch("/manager/find-manager");
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);

    return (
        <div className={`min-h-screen pt-20 flex ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}>
            {/* Sidebar */}
            <aside className={`w-1/4 min-h-screen p-6 flex flex-col items-center shadow-lg ${theme === "light" ? "bg-white text-gray-800" : "bg-gray-800 text-white"}`}>
                <img
                    src={profileData?.profilepic || "/default-avatar.png"}
                    className="w-24 h-24 rounded-full shadow-lg border-2 border-gray-300"
                    alt="Profile"
                />
                
                <h2 className="mt-4 text-lg font-semibold">{profileData?.name || "Your Name"}</h2>
                <h2 className="mt-2 text-md">{profileData?.email || "Your Email"}</h2>
                <h2 className="mt-2 text-md">{profileData?.phoneNumber || "Your Phone Number"}</h2>

                <nav className="mt-6 w-full">
                    <button onClick={() => navigate("/manager/profile-update")} className="w-full flex items-center px-4 py-2 bg-green-500 text-white rounded-md">
                        ✏️ Edit Profile
                    </button>
                    
                </nav>
            </aside>

            {/* Main Content */}
            <main className="w-3/4 p-6">
    <div className={`p-6 rounded-lg shadow-md ${theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white"}`}>
        <h2 className="text-xl font-bold">Manager Dashboard</h2>
        <p className="mt-2">Welcome, {profileData?.name || "Manager"}! Here you can manage your account settings.</p>
    </div>
</main>

        </div>
    );
};

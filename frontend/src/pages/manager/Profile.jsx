import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export const ManagerProfile = () => {
    const [profileData] = useFetch("/manager/find-manager");
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);

    return (
        <div className={`min-h-screen flex flex-col items-center pt-16 px-6 ${theme === "light" ? "bg-gray-100 text-black" : "bg-gray-900 text-white"}`}>
            <div className={`w-full max-w-md mt-6 p-6 rounded-lg shadow-md ${theme === "light" ? "bg-white" : "bg-gray-800"}`}>
                <h2 className="text-xl font-bold">Manager Dashboard</h2>
                <p className="mt-2">Welcome, {profileData?.name || "Manager"}! Here you can manage your account settings.</p>
            </div><br></br>
            {/* Profile Card */}
            <div className={`w-full max-w-md p-6 rounded-lg shadow-md text-center ${theme === "light" ? "bg-white" : "bg-gray-800"}`}>
                <h2 className="text-2xl font-bold">{profileData?.name || "Your Name"}</h2>
                <p className="text-md mt-1">{profileData?.email || "Your Email"}</p>
                <p className="text-md mt-1">{profileData?.phoneNumber || "Your Phone Number"}</p>
                <button 
                    onClick={() => navigate("/manager/profile-update")} 
                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
                    ✏️ Edit Profile
                </button>
            </div>

            {/* Dashboard Section */}
            
        </div>
    );
};

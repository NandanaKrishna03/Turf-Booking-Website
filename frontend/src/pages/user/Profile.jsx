import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";  // Adjust the path accordingly

export const Profile = () => {
    const [profileData] = useFetch("/user/profile");
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext); // Consume theme context

    const handleEditProfile = () => {
        navigate("/user/profile-update");
    };

    const handleChangePassword = () => {
        navigate("/user/change-password");
    };

    const handleDeactivate = () => {
        navigate("/user/account-deactivate");
    };

    const handleBooking = () => {
        navigate("/user/get-bookings");
    };

    const handleUserTurf = () => {
        navigate("/turfs");
    };

    return (
        <div
            className={`min-h-screen flex justify-center p-6 ${theme === "light" ? "bg-gray-50" : "bg-gray-800"}`} // Conditional background color
        >
            {/* Profile Section - Centered with a modern design */}
            <div
                className={`w-full max-w-4xl flex flex-col items-center justify-center p-6 rounded-xl shadow-lg ${
                    theme === "light" ? "bg-white text-gray-800" : "bg-gray-900 text-white"
                }`} // Profile card background and text color
            >
                <h1 className="text-3xl font-bold mb-6">
                    Hi, {profileData?.name || "User"} 👋
                </h1>

                {/* Profile Picture Section */}
                <section
                    className={`w-full max-w-md flex flex-col items-center p-8 rounded-xl shadow-xl text-center border-2 ${
                        theme === "light" ? "border-[#4A90E2] bg-white" : "border-gray-700 bg-gray-900"
                    }`} // Profile card styling with a darker light blue border
                >
                    <img
                        src={profileData?.profilepic}
                        className={`w-40 h-40 rounded-full shadow-lg mb-4 ${
                            theme === "light" ? "border-4 border-[#4A90E2]" : "border-4 border-gray-700"
                        }`}
                        alt="Profile"
                    />
                    <h2 className="text-xl font-semibold">{profileData?.email}</h2>
                    <h3 className="text-lg">{profileData?.phoneNumber}</h3>
                </section>

                {/* Action Buttons */}
                <div className="mt-8 w-full max-w-md flex flex-col gap-4">
                    <button
                        className={`btn w-full text-left ${
                            theme === "light" ? "bg-[#4A90E2] hover:bg-[#357ABD]" : "bg-gray-700 hover:bg-gray-600"
                        } text-white rounded-md transition-all duration-300`}
                        onClick={handleEditProfile}
                    >
                        Edit Profile
                    </button>
                    <button
                        className={`btn w-full text-left ${
                            theme === "light" ? "bg-[#4A90E2] hover:bg-[#357ABD]" : "bg-gray-700 hover:bg-gray-600"
                        } text-white rounded-md transition-all duration-300`}
                        onClick={handleChangePassword}
                    >
                        Change Password
                    </button>
                    <button
                        className={`btn w-full text-left ${
                            theme === "light" ? "bg-[#4A90E2] hover:bg-[#357ABD]" : "bg-gray-700 hover:bg-gray-600"
                        } text-white rounded-md transition-all duration-300`}
                        onClick={handleDeactivate}
                    >
                        Deactivate Account
                    </button>
                    <button
                        className={`btn w-full text-left ${
                            theme === "light" ? "bg-[#4A90E2] hover:bg-[#357ABD]" : "bg-gray-700 hover:bg-gray-600"
                        } text-white rounded-md transition-all duration-300`}
                        onClick={handleBooking}
                    >
                        My Bookings
                    </button>
                    <button
                        className={`btn w-full text-left ${
                            theme === "light" ? "bg-[#4A90E2] hover:bg-[#357ABD]" : "bg-gray-700 hover:bg-gray-600"
                        } text-white rounded-md transition-all duration-300`}
                        onClick={handleUserTurf}
                    >
                        My Turfs
                    </button>
                </div>
            </div>
        </div>
    );
};

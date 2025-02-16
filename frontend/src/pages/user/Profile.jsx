import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
    const [profileData] = useFetch("/user/profile");
    const navigate = useNavigate();

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
        <div className="min-h-screen flex bg-white dark:bg-black p-6">
            {/* Sidebar - Buttons */}
            <div className="w-1/4 bg-white dark:bg-gray-900 p-6 shadow-lg rounded-lg flex flex-col gap-4">
                <button
                    className="btn w-full text-left bg-blue-800 hover:bg-blue-900 text-white rounded-md transition-all duration-300"
                    onClick={handleEditProfile}
                >
                    Edit Profile
                </button>
                <button
                    className="btn w-full text-left bg-blue-800 hover:bg-blue-900 text-white rounded-md transition-all duration-300"
                    onClick={handleChangePassword}
                >
                    Change Password
                </button>
                <button
                    className="btn w-full text-left bg-blue-800 hover:bg-blue-900 text-white rounded-md transition-all duration-300"
                    onClick={handleDeactivate}
                >
                    Deactivate Account
                </button>
                <button
                    className="btn w-full text-left bg-blue-800 hover:bg-blue-900 text-white rounded-md transition-all duration-300"
                    onClick={handleBooking}
                >
                    My Bookings
                </button>
                <button
                    className="btn w-full text-left bg-blue-800 hover:bg-blue-900 text-white rounded-md transition-all duration-300"
                    onClick={handleUserTurf}
                >
                    My Turfs
                </button>
            </div>

            {/* Profile Section */}
            <div className="w-3/4 flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold mb-6 text-black dark:text-white">
                    Hi, {profileData?.name || "User"} 👋
                </h1>
                <section className="bg-white dark:bg-gray-900 p-8 rounded-md shadow-lg w-full max-w-md text-center border-2 border-blue-800">
                    <img 
                        src={profileData?.profilepic} 
                        className="w-40 h-40 rounded-full shadow-lg mx-auto border-4 border-blue-800" 
                        alt="Profile" 
                    />
                    <h2 className="text-lg mt-4 font-semibold text-black dark:text-white">
                        {profileData?.email}
                    </h2>
                    <h2 className="text-lg text-black dark:text-white">
                        {profileData?.phoneNumber}
                    </h2>
                </section>
            </div>
        </div>
    );
};
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
        <div className="min-h-screen flex bg-gray-100 p-6">
            {/* Sidebar - Buttons */}
            <div className="w-1/4 bg-white p-6 shadow-lg rounded-lg flex flex-col gap-4">
                <button className="btn btn-primary w-full text-left bg-blue-500 hover:bg-blue-600 text-white" onClick={handleEditProfile}>
                    Edit Profile
                </button>
                <button className="btn btn-primary w-full text-left bg-blue-500 hover:bg-blue-600 text-white" onClick={handleChangePassword}>
                    Change Password
                </button>
                <button className="btn btn-primary w-full text-left bg-blue-500 hover:bg-blue-600 text-white" onClick={handleDeactivate}>
                    Deactivate Account
                </button>
                <button className="btn btn-primary w-full text-left bg-blue-500 hover:bg-blue-600 text-white" onClick={handleBooking}>
                    My Bookings
                </button>
                <button className="btn btn-primary w-full text-left bg-blue-500 hover:bg-blue-600 text-white" onClick={handleUserTurf}>
                    My Turfs
                </button>
            </div>

            {/* Profile Section */}
            <div className="w-3/4 flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold mb-6">Hi, {profileData?.name || "User"} 👋</h1>
                <section className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
                    <img 
                        src={profileData?.profilepic} 
                        className="w-40 h-40 rounded-full shadow-lg mx-auto" 
                        alt="Profile" 
                    />
                    <h2 className="text-lg mt-4 font-semibold">{profileData?.email}</h2>
                    <h2 className="text-lg">{profileData?.phoneNumber}</h2>
                </section>
            </div>
        </div>
    );
};

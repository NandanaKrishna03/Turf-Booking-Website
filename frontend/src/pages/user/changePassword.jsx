import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ThemeContext } from "../../context/ThemeContext";

export const ChangePassword = () => {
    const { theme } = useContext(ThemeContext);
    const isDarkMode = theme === "dark";

    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const toggleOldPasswordVisibility = () => setShowOldPassword(!showOldPassword);
    const toggleNewPasswordVisibility = () => setShowNewPassword(!showNewPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    const onSubmit = async (data) => {
        try {
            const response = await axiosInstance.post("/user/change-password", {
                oldPassword: data.oldPassword,
                newPassword: data.newPassword,
                confirmPassword: data.confirmPassword,
            });

            if (response.data.success) {
                toast.success("Password changed successfully", { icon: "✅" });
                navigate("/user/profile");
            } else {
                toast.error(response.data.message || "Old password is incorrect");
            }
        } catch (error) {
            toast.error("Failed to change password");
            console.error(error);
        }
    };

    return (
        <div
            className={`mt-20 flex justify-center items-center min-h-screen transition-all duration-300 ${
                isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
            }`}
        >
            <div
                className={`shadow-lg rounded-2xl p-8 w-full max-w-md transition-all duration-300 ${
                    isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
                }`}
            >
                <h2 className="text-3xl font-semibold text-center mb-6">Change Password</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Old Password */}
                    <div>
                        <label className={`block mb-1 font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                            Old Password
                        </label>
                        <div className="relative">
                            <input
                                type={showOldPassword ? "text" : "password"}
                                {...register("oldPassword", { required: true })}
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                                    isDarkMode
                                        ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-500"
                                        : "bg-white text-black border-gray-300 focus:ring-green-500"
                                }`}
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-3 flex items-center text-xl"
                                onClick={toggleOldPasswordVisibility}
                            >
                                {showOldPassword ? "🙈" : "👁️"}
                            </button>
                        </div>
                    </div>

                    {/* New Password */}
                    <div>
                        <label className={`block mb-1 font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showNewPassword ? "text" : "password"}
                                {...register("newPassword", { required: true })}
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                                    isDarkMode
                                        ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-500"
                                        : "bg-white text-black border-gray-300 focus:ring-green-500"
                                }`}
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-3 flex items-center text-xl"
                                onClick={toggleNewPasswordVisibility}
                            >
                                {showNewPassword ? "🙈" : "👁️"}
                            </button>
                        </div>
                    </div>

                    {/* Confirm New Password */}
                    <div>
                        <label className={`block mb-1 font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                            Confirm New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                {...register("confirmPassword", { required: true })}
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                                    isDarkMode
                                        ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-500"
                                        : "bg-white text-black border-gray-300 focus:ring-green-500"
                                }`}
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-3 flex items-center text-xl"
                                onClick={toggleConfirmPasswordVisibility}
                            >
                                {showConfirmPassword ? "🙈" : "👁️"}
                            </button>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between mt-6">
                        <button
                            type="button"
                            className={`px-4 py-2 rounded-lg transition-all ${
                                isDarkMode
                                    ? "bg-gray-600 text-white hover:bg-gray-700"
                                    : "bg-gray-300 text-black hover:bg-gray-400"
                            }`}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`px-4 py-2 font-semibold rounded-lg transition-all ${
                                isDarkMode
                                    ? "bg-blue-600 text-white hover:bg-blue-700"
                                    : "bg-green-500 text-white hover:bg-green-600"
                            }`}
                        >
                            Change Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

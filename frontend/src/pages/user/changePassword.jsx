import { useForm } from "react-hook-form";
import { useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const ChangePassword = () => {
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
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Old Password</span>
                            </label>
                            <div className="relative">
                                <input type={showOldPassword ? "text" : "password"} {...register("oldPassword", { required: true })} className="input input-bordered w-full" required />
                                <button type="button" className="absolute inset-y-0 right-3 flex items-center" onClick={toggleOldPasswordVisibility}>
                                    {showOldPassword ? "🙈" : "👁️"}
                                </button>
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">New Password</span>
                            </label>
                            <div className="relative">
                                <input type={showNewPassword ? "text" : "password"} {...register("newPassword", { required: true })} className="input input-bordered w-full" required />
                                <button type="button" className="absolute inset-y-0 right-3 flex items-center" onClick={toggleNewPasswordVisibility}>
                                    {showNewPassword ? "🙈" : "👁️"}
                                </button>
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Confirm New Password</span>
                            </label>
                            <div className="relative">
                                <input type={showConfirmPassword ? "text" : "password"} {...register("confirmPassword", { required: true })} className="input input-bordered w-full" required />
                                <button type="button" className="absolute inset-y-0 right-3 flex items-center" onClick={toggleConfirmPasswordVisibility}>
                                    {showConfirmPassword ? "🙈" : "👁️"}
                                </button>
                            </div>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Change Password</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

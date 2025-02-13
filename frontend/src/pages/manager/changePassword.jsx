import { useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

const ChangeManagerPassword = () => {
    const [formData, setFormData] = useState({ oldPassword: "", newPassword: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.put("/manager/change-password", formData);
            toast.success("Password updated successfully!");
            setFormData({ oldPassword: "", newPassword: "" });
        } catch (error) {
            toast.error("Failed to change password");
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
                <label className="block">
                    Old Password:
                    <input type="password" name="oldPassword" value={formData.oldPassword} onChange={handleChange} className="input input-bordered w-full" required />
                </label>
                <label className="block mt-4">
                    New Password:
                    <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} className="input input-bordered w-full" required />
                </label>
                <button type="submit" className="btn btn-primary mt-4">Change Password</button>
            </form>
        </div>
    );
};

export default ChangeManagerPassword;

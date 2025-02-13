import { useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const DeactivateAccount = () => {
    const [confirmText, setConfirmText] = useState("");
    const navigate = useNavigate();

    const handleDeactivate = async () => {
        if (confirmText !== "DEACTIVATE") {
            toast.error("Please type 'DEACTIVATE' to confirm");
            return;
        }
        try {
            const response = await axiosInstance.post("/user/deactivate");
            if (response.data.success) {
                toast.success("Account deactivated successfully", { icon: "✅" });
                navigate("/logout");
            } else {
                toast.error(response.data.message || "Failed to deactivate account");
            }
        } catch (error) {
            toast.error("Something went wrong. Try again later.");
            console.error(error);
        }
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl p-6">
                    <h2 className="text-lg font-bold text-center text-red-600">Deactivate Account</h2>
                    <p className="text-sm text-gray-600 text-center mb-4">
                        Type <strong>DEACTIVATE</strong> below to confirm account deactivation.
                    </p>
                    <input
                        type="text"
                        placeholder="Type DEACTIVATE"
                        value={confirmText}
                        onChange={(e) => setConfirmText(e.target.value)}
                        className="input input-bordered w-full mb-4"
                    />
                    <button
                        className="btn btn-error w-full"
                        onClick={handleDeactivate}
                    >
                        Deactivate Account
                    </button>
                </div>
            </div>
        </div>
    );
};

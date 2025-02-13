import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

const DeleteManagerAccount = () => {
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete your account permanently?")) {
            try {
                await axiosInstance.delete("/manager/delete-manager");
                toast.success("Account deleted successfully");
                navigate("/login");
            } catch (error) {
                toast.error("Failed to delete account");
                console.error(error);
            }
        }
    };

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h2 className="text-lg font-semibold text-red-600">Permanently Delete Account?</h2>
                <p className="text-gray-500 mt-2">This action cannot be undone.</p>
                <button onClick={handleDelete} className="btn btn-error mt-4">Delete Account</button>
            </div>
        </div>
    );
};

export default DeleteManagerAccount;

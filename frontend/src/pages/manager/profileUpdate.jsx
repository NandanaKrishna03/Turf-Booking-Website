import { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../config/axiosInstance";
import { saveManager } from "../../redux/features/managerSlice";
import toast from "react-hot-toast";
import { ThemeContext } from "../../context/ThemeContext";

const EditManagerProfile = () => {
    const dispatch = useDispatch();
    const { manager } = useSelector((state) => state.manager);
    const { theme } = useContext(ThemeContext);
    
    const [formData, setFormData] = useState({
        name: manager?.name || "",
        phoneNumber: manager?.phoneNumber || "",
        profilepic: manager?.profilepic || "",
    });
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append("name", formData.name);
            formDataToSend.append("phoneNumber", formData.phoneNumber);
            if (image) {
                formDataToSend.append("profilepic", image);
            }

            const response = await axiosInstance.post("/manager/profile-update", formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            
            dispatch(saveManager(response.data.data));
            toast.success("Profile updated successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Update failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`min-h-screen flex items-center justify-center p-6 ${theme === "light" ? "bg-gray-100" : "bg-gray-900"}`}>
            <div className={`w-full max-w-md p-6 rounded-lg shadow-lg ${theme === "light" ? "bg-white" : "bg-gray-800"}`}>
                <h2 className="text-2xl font-semibold text-center mb-6 dark:text-white">Edit Profile</h2>

                {/* Profile Picture Preview */}
                <div className="flex justify-center">
                    {image ? (
                        <img src={URL.createObjectURL(image)} alt="New Profile" className="w-24 h-24 rounded-full object-cover shadow-md" />
                    ) : (
                        formData.profilepic && (
                            <img src={formData.profilepic} alt="Current Profile" className="w-24 h-24 rounded-full object-cover shadow-md" />
                        )
                    )}
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                    <label className={`block text-sm font-medium ${theme === "light" ? "text-black" : "text-gray-300"}`}>Name</label>
                    
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-300 ${theme === "light" ? "bg-white text-black" : "bg-gray-700 text-white"}`}
                            required
                        />
                    </div>

                    <div>
                    <label className={`block text-sm font-medium ${theme === "light" ? "text-black" : "text-gray-300"}`}>Phone Number</label>
                    
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className={`w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-300 ${theme === "light" ? "bg-white text-black" : "bg-gray-700 text-white"}`}
                        />
                    </div>

                    <div>
                        <label className={`block text-sm font-medium ${theme === "light" ? "text-black" : "text-gray-300"}`}>Profile Picture</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className={`w-full border rounded-md px-3 py-2 file:border-0 file:px-4 file:py-2 file:rounded-md file:cursor-pointer ${theme === "light" ? "bg-white text-black file:bg-gray-200 file:text-black" : "bg-gray-700 text-white file:bg-gray-900 file:text-white"}`}
                        />
                    </div>


                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-medium px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:bg-blue-400"
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Save Changes"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditManagerProfile;

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { useSelector } from "react-redux";
import { ThemeContext } from "../../context/ThemeContext"; // Import ThemeContext

export const AddTurf = () => {
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext); // Get theme from context
    const isDarkMode = theme === "dark"; // Determine if dark mode is active

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
        address: "",
        price: "",
        availableDates: "",
        availableTimeSlots: "",
        image: null,
    });

    const { manager } = useSelector((state) => state.manager);

    const handleChange = (e) => {
        if (e.target.name === "image") {
            setFormData({ ...formData, image: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!manager) {
            alert("Manager not authenticated");
            return;
        }

        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });

        try {
            await axiosInstance.post("/turf/add-turf", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("Turf added successfully!");
            navigate("/manager/turfs");
        } catch (error) {
            console.error("Error adding turf:", error);
            alert("Failed to add turf");
        }
    };

    return (
        <div
            className={`mt-20 p-8 min-h-screen flex flex-col items-center transition-all duration-300 ${
                isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
            }`}
        >
            <h2 className="text-3xl font-extrabold mb-6 text-center">Add New Turf</h2>
            <form 
                onSubmit={handleSubmit} 
                className={`w-full max-w-lg space-y-6 p-8 rounded-lg shadow-lg transition-all ${
                    isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
                }`}
            >
                <div className="flex flex-col">
                    <label htmlFor="title" className="text-lg font-medium">Title</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter Turf Title"
                        onChange={handleChange}
                        required
                        className="input w-full mt-2"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="category" className="text-lg font-medium">Category</label>
                    <input
                        type="text"
                        name="category"
                        placeholder="Enter Turf Category"
                        onChange={handleChange}
                        required
                        className="input w-full mt-2"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="description" className="text-lg font-medium">Description</label>
                    <textarea
                        name="description"
                        placeholder="Enter Turf Description"
                        onChange={handleChange}
                        required
                        className="input h-32 resize-none mt-2"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="address" className="text-lg font-medium">Address</label>
                    <input
                        type="text"
                        name="address"
                        placeholder="Enter Turf Address"
                        onChange={handleChange}
                        required
                        className="input w-full mt-2"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="price" className="text-lg font-medium">Price</label>
                    <input
                        type="number"
                        name="price"
                        placeholder="Enter Turf Price"
                        onChange={handleChange}
                        required
                        className="input w-full mt-2"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="availableDates" className="text-lg font-medium">Available Dates</label>
                    <input
                        type="text"
                        name="availableDates"
                        placeholder="Enter Available Dates"
                        onChange={handleChange}
                        required
                        className="input w-full mt-2"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="availableTimeSlots" className="text-lg font-medium">Available Time Slots</label>
                    <input
                        type="text"
                        name="availableTimeSlots"
                        placeholder="Enter Available Time Slots"
                        onChange={handleChange}
                        required
                        className="input w-full mt-2"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="image" className="text-lg font-medium">Upload Image</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                        required
                        className="input w-full mt-2"
                    />
                </div>

                <div className="flex justify-center mt-6">
                    <button
                        type="submit"
                        className={`py-2 px-6 rounded-lg transition-all font-semibold ${
                            isDarkMode
                                ? "bg-green-700 text-white hover:bg-green-800"
                                : "bg-green-600 text-white hover:bg-green-700"
                        }`}
                    >
                        Add Turf
                    </button>
                </div>
            </form>
        </div>
    );
};

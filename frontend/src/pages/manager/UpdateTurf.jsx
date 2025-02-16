import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { useSelector } from "react-redux";

export const UpdateTurf = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get turf ID from URL
    const { manager } = useSelector((state) => state.manager); // Get manager info
    const token = localStorage.getItem("token"); // Retrieve token
    
    const [formData, setFormData] = useState({
        title: "",
        category: [],
        description: "",
        address: "",
        price: "",
        availableDates: [],
        availableTimeSlots: [],
        image: null,
        previewImage: "", // To show existing image
    });

    // Fetch existing turf details
    useEffect(() => {
        const fetchTurfDetails = async () => {
            try {
                const response = await axiosInstance.get(`/turf/turfDetails/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const turf = response.data.data;

                setFormData({
                    title: turf.title,
                    category: Array.isArray(turf.category) ? turf.category : turf.category.split(","),
                    description: turf.description,
                    address: turf.address,
                    price: turf.price,
                    availableDates: Array.isArray(turf.availableDates) ? turf.availableDates : JSON.parse(turf.availableDates),
                    availableTimeSlots: Array.isArray(turf.availableTimeSlots) ? turf.availableTimeSlots : JSON.parse(turf.availableTimeSlots),
                    previewImage: turf.image, // Existing image preview
                });
            } catch (error) {
                console.error("Error fetching turf details:", error);
                alert("Failed to fetch turf details");
            }
        };

        if (id) fetchTurfDetails();
    }, [id, token]);

    // Handle input changes
    const handleChange = (e) => {
        if (e.target.name === "image") {
            setFormData({
                ...formData,
                image: e.target.files[0],
                previewImage: URL.createObjectURL(e.target.files[0]), // Show selected image
            });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!manager) {
            alert("Manager not authenticated");
            return;
        }

        const data = new FormData();
        data.append("title", formData.title);
        data.append("category", formData.category.join(",")); // Convert array to string
        data.append("description", formData.description);
        data.append("address", formData.address);
        data.append("price", formData.price);
        data.append("availableDates", JSON.stringify(formData.availableDates)); // Store as JSON
        data.append("availableTimeSlots", JSON.stringify(formData.availableTimeSlots));
        if (formData.image) data.append("image", formData.image);

        try {
            const response = await axiosInstance.post(`/turf/update-turf/${id}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Update response:", response.data); // Log the response for debugging

            alert("Turf updated successfully!");
            navigate("/manager/turfs", { state: { refresh: true } }); // Ensure refresh trigger
        } catch (error) {
            console.error("Error updating turf:", error);
            alert(error.response?.data?.message || "Failed to update turf");
        }
    };

    return (
        <div className="p-6 bg-gray-800 text-white min-h-screen flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Update Turf</h2>
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    placeholder="Title"
                    onChange={handleChange}
                    required
                    className="input"
                />
                <input
                    type="text"
                    name="category"
                    value={formData.category.join(",")}
                    placeholder="Category (comma-separated)"
                    onChange={handleChange}
                    required
                    className="input"
                />
                <textarea
                    name="description"
                    value={formData.description}
                    placeholder="Description"
                    onChange={handleChange}
                    required
                    className="input"
                />
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    placeholder="Address"
                    onChange={handleChange}
                    required
                    className="input"
                />
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    placeholder="Price"
                    onChange={handleChange}
                    required
                    className="input"
                />
                <input
                    type="text"
                    name="availableDates"
                    value={formData.availableDates.join(",")}
                    placeholder="Available Dates (comma-separated)"
                    onChange={handleChange}
                    required
                    className="input"
                />
                <input
                    type="text"
                    name="availableTimeSlots"
                    value={formData.availableTimeSlots.join(",")}
                    placeholder="Available Time Slots (comma-separated)"
                    onChange={handleChange}
                    required
                    className="input"
                />
                
                {/* Image Upload */}
                <div className="space-y-2">
                    {formData.previewImage && (
                        <img
                            src={formData.previewImage}
                            alt="Turf Preview"
                            className="w-full h-40 object-cover rounded-lg"
                        />
                    )}
                    <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                        className="input"
                    />
                </div>

                <button type="submit" className="btn-primary">
                    Update Turf
                </button>
            </form>
        </div>
    );
};
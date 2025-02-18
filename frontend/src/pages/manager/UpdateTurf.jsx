import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { useSelector } from "react-redux";


export const UpdateTurf = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { manager } = useSelector((state) => state.manager);
    const token = localStorage.getItem("token");

    const [formData, setFormData] = useState({
        title: "",
        category: [],
        description: "",
        address: "",
        price: "",
        availableDates: [],
        availableTimeSlots: [],
        image: null,
        previewImage: "",
    });

    useEffect(() => {
        const fetchTurfDetails = async () => {
            try {
                const response = await axiosInstance.get(`/turf/turfDetails/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
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
                    previewImage: turf.image,
                });
            } catch (error) {
                console.error("Error fetching turf details:", error);
                alert("Failed to fetch turf details");
            }
        };

        if (id) fetchTurfDetails();
    }, [id, token]);

    const handleChange = (e) => {
        if (e.target.name === "image") {
            setFormData({
                ...formData,
                image: e.target.files[0],
                previewImage: URL.createObjectURL(e.target.files[0]),
            });
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
        data.append("title", formData.title);
        data.append("category", formData.category.join(","));
        data.append("description", formData.description);
        data.append("address", formData.address);
        data.append("price", formData.price);
        data.append("availableDates", JSON.stringify(formData.availableDates));
        data.append("availableTimeSlots", JSON.stringify(formData.availableTimeSlots));
        if (formData.image) data.append("image", formData.image);

        try {
            await axiosInstance.post(`/turf/update-turf/${id}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });
            alert("Turf updated successfully!");
            navigate("/manager/turfs", { state: { refresh: true } });
        } catch (error) {
            console.error("Error updating turf:", error);
            alert(error.response?.data?.message || "Failed to update turf");
        }
    };

    return (
        <div className="p-6 min-h-screen flex flex-col items-center bg-gray-100 text-gray-900">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-3xl font-bold text-center">Update Turf</h2>
                    
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full p-2 border rounded" placeholder="Title" />
                    <input type="text" name="category" value={formData.category.join(",")} onChange={handleChange} required className="w-full p-2 border rounded" placeholder="Category (comma-separated)" />
                    <textarea name="description" value={formData.description} onChange={handleChange} required className="w-full p-2 border rounded" placeholder="Description"></textarea>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} required className="w-full p-2 border rounded" placeholder="Address" />
                    <input type="number" name="price" value={formData.price} onChange={handleChange} required className="w-full p-2 border rounded" placeholder="Price" />
                    <input type="text" name="availableDates" value={formData.availableDates.join(",")} onChange={handleChange} required className="w-full p-2 border rounded" placeholder="Available Dates (comma-separated)" />
                    <input type="text" name="availableTimeSlots" value={formData.availableTimeSlots.join(",")} onChange={handleChange} required className="w-full p-2 border rounded" placeholder="Available Time Slots (comma-separated)" />
                    
                    <div className="space-y-2">
                        {formData.previewImage && <img src={formData.previewImage} alt="Turf Preview" className="w-full h-40 object-cover rounded-lg" />}
                        <input type="file" name="image" onChange={handleChange} className="w-full p-2 border rounded" />
                    </div>

                    <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Update Turf</button>
                </form>
            </div>
        </div>
    );
};

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { useSelector } from "react-redux";

export const UpdateTurf = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get turf ID from URL
    const { manager } = useSelector((state) => state.manager); // Get manager info
    
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

    useEffect(() => {
        const fetchTurfDetails = async () => {
            try {
                const response = await axiosInstance.get(`/turf/turfDetails/${id}`);
                console.log("Fetched Turf Details:", response.data);
                
                // Ensure we correctly extract the data object
                setFormData(response.data.data); 
            } catch (error) {
                console.error("Error fetching turf details:", error);
                alert("Failed to fetch turf details");
            }
        };
    
        if (id) {
            fetchTurfDetails();
        }
    }, [id]);
    
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
            await axiosInstance.put(`/turf/update-turf/${id}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("Turf updated successfully!");
            navigate("/manager/turfs"); // Redirect after update
        } catch (error) {
            console.error("Error updating turf:", error);
            alert("Failed to update turf");
        }
    };
    
    
    return (
        <div className="p-6 bg-gray-800 text-white min-h-screen flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Update Turf</h2>
            <form onSubmit={handleSubmit} className="w-full max-w-md">
                <input type="text" name="title" value={formData.title} placeholder="Title" onChange={handleChange} required className="input" />
                <input type="text" name="category" value={formData.category} placeholder="Category" onChange={handleChange} required className="input" />
                <textarea name="description" value={formData.description} placeholder="Description" onChange={handleChange} required className="input" />
                <input type="text" name="address" value={formData.address} placeholder="Address" onChange={handleChange} required className="input" />
                <input type="number" name="price" value={formData.price} placeholder="Price" onChange={handleChange} required className="input" />
                <input type="text" name="availableDates" value={formData.availableDates} placeholder="Available Dates" onChange={handleChange} required className="input" />
                <input type="text" name="availableTimeSlots" value={formData.availableTimeSlots} placeholder="Available Time Slots" onChange={handleChange} required className="input" />
                <input type="file" name="image" onChange={handleChange} className="input" />
                <button type="submit" className="btn-primary">Update Turf</button>
            </form>
        </div>
    );
};

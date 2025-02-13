import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { useSelector } from "react-redux";

export const AddTurf = () => {
    const navigate = useNavigate();
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
    
    const { manager } = useSelector((state) => state.manager); // Get manager info
    
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
            navigate("/manager/turfs"); // Redirect to manager's turfs
        } catch (error) {
            console.error("Error adding turf:", error);
            alert("Failed to add turf");
        }
    };
    
    return (
        <div className="p-6 bg-gray-800 text-white min-h-screen flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Add Turf</h2>
            <form onSubmit={handleSubmit} className="w-full max-w-md">
                <input type="text" name="title" placeholder="Title" onChange={handleChange} required className="input" />
                <input type="text" name="category" placeholder="Category" onChange={handleChange} required className="input" />
                <textarea name="description" placeholder="Description" onChange={handleChange} required className="input" />
                <input type="text" name="address" placeholder="Address" onChange={handleChange} required className="input" />
                <input type="number" name="price" placeholder="Price" onChange={handleChange} required className="input" />
                <input type="text" name="availableDates" placeholder="Available Dates" onChange={handleChange} required className="input" />
                <input type="text" name="availableTimeSlots" placeholder="Available Time Slots" onChange={handleChange} required className="input" />
                <input type="file" name="image" onChange={handleChange} required className="input" />
                <button type="submit" className="btn-primary">Add Turf</button>
            </form>
        </div>
    );
};

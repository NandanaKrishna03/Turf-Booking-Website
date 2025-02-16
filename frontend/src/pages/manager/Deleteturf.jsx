import  { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import {  useSelector } from "react-redux";


export const DeleteTurf = () => {
    const { id } = useParams(); // Get the turf ID from the URL
    const navigate = useNavigate();
    const { manager } = useSelector((state) => state.manager);
    console.log(manager);
     // Get manager info
    useEffect(() => {
        const deleteTurf = async () => {
            try {
                const response = await axiosInstance.post(`/delete-turf/turfDetails/${id}`);
                if (response.status === 200) {
                    alert("Turf deleted successfully!");
                    navigate("/manager/turfs"); // Redirect to the turfs page after deletion
                }
            } catch (error) {
                console.error("Error deleting turf:", error);
                if (error.response && error.response.status === 401) {
                    // If unauthorized, clear the manager state and redirect to login
                    
                    navigate("/manager/login");
                } else {
                    alert("Failed to delete turf. Please try again.");
                }
            }
        };

        if (id) {
            deleteTurf();
        }
    }, [id]);
    
    return (
        <div className="flex justify-center items-center min-h-screen">
            <p>Deleting turf... Please wait.</p>
        </div>
    );
};


/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";

export const DeleteTurf = ({ turfId }) => {
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this turf?")) {
            try {
                const token = localStorage.getItem("token"); // Get token from local storage

                if (!token) {
                    alert("Unauthorized: Please log in again.");
                    return;
                }

                await axiosInstance.delete(`/turf/delete-turf/${turfId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Attach token to request
                    },
                });

                alert("Turf deleted successfully!");
                navigate("/manager/turfs");
            } catch (error) {
                console.error("Error deleting turf:", error);
                alert(error.response?.data?.message || "Failed to delete turf");
            }
        }
    };

    return <button onClick={handleDelete} className="btn-danger">Delete Turf</button>;
};

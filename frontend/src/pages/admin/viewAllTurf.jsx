import { axiosInstance } from "../../config/axiosInstance";
import { useFetch } from "../../hooks/useFetch";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const ViewAllTurfs = () => {
    const { theme } = useContext(ThemeContext);
    const [turfs, isLoading, error, refetch] = useFetch("/admin/turfs");

    const handleDeleteTurf = async (turfId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this turf?");
        if (!confirmDelete) return;

        try {
            console.log("Deleting Turf with ID:", turfId);
            await axiosInstance.delete(`/admin/turf/${turfId}`);
            refetch(); // Refresh the list after deletion
        } catch (error) {
            console.error("Error deleting turf:", error);
            alert("Failed to delete turf. Please try again.");
        }
    };

    if (isLoading) {
        return <div className="text-center text-gray-600 dark:text-gray-300 text-lg">Loading turfs...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 dark:text-red-400 text-lg">Error: {error}</div>;
    }

    return (
        <div className={`max-w-5xl mx-auto mt-10 p-6 shadow-lg rounded-lg transition-all duration-300 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
            
            <h1 className="text-2xl font-semibold text-center mb-6">All Turfs</h1>

            {turfs?.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400">No turfs available.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200 dark:border-gray-700 rounded-lg">
                        <thead>
                            <tr className="bg-gray-100 dark:bg-gray-800">
                                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Image</th>
                                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Name</th>
                                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Price</th>
                                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {turfs.map((turf) => (
                                <tr key={turf._id} className="text-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200">
                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                                        <img 
                                            src={turf.image} 
                                            alt={turf.title} 
                                            className="w-20 h-20 object-cover rounded-md mx-auto shadow-md"
                                        />
                                    </td>
                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{turf.title}</td>
                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">₹{turf.price}</td>
                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                                        <button
                                            onClick={() => handleDeleteTurf(turf._id)}
                                            className="bg-red-500 dark:bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-600 dark:hover:bg-red-700 transition-all duration-200"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ViewAllTurfs;

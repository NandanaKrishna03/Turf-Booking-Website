import { axiosInstance } from "../../config/axiosInstance";
import { useFetch } from "../../hooks/useFetch";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import toast from "react-hot-toast";

const ManageManagers = () => {
    const { theme } = useContext(ThemeContext);
    const [managers, isLoading, error, refetch] = useFetch("/admin/getAllManagers");
    const isDarkMode = theme === "dark";

    const handleDeleteManager = async (managerId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this manager?");
        if (!confirmDelete) return;

        try {
            await axiosInstance.delete(`/admin/manager/${managerId}`);
            toast.success("Manager deleted successfully!");
            refetch(); // Refresh the list after deletion
        } catch (error) {
            console.error("Error deleting manager:", error);
            toast.error("Failed to delete manager. Please try again.");
        }
    };

    if (isLoading) {
        return <div className="text-center text-gray-600 dark:text-gray-300 text-lg">Loading managers...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 dark:text-red-400 text-lg">Error: {error || "Failed to load managers"}</div>;
    }

    return (
        <div className={`max-w-5xl mx-auto mt-10 p-6 shadow-lg rounded-lg ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
            <h1 className="text-2xl font-semibold text-center mb-6">Manage Managers</h1>

            {managers?.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400">No managers available.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200 dark:border-gray-700 rounded-lg">
                        <thead>
                            <tr className="bg-gray-100 dark:bg-gray-700">
                                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Name</th>
                                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Email</th>
                                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {managers.map((manager) => (
                                <tr key={manager._id} className="text-center hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{manager.name}</td>
                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{manager.email}</td>
                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                                        <button
                                            onClick={() => handleDeleteManager(manager._id)}
                                            className="bg-red-500 dark:bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-600 dark:hover:bg-red-700 transition"
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

export default ManageManagers;

// ManageManagers.jsx
import { axiosInstance } from "../../config/axiosInstance";
import { useFetch } from "../../hooks/useFetch";

const ManageManagers = () => {
    const [managers, isLoading, error, refetch] = useFetch("/admin/getAllManagers");

    const handleDeleteManager = async (managerId) => {
        try {
            await axiosInstance.delete(`/admin/manager/${managerId}`);
            refetch(); // Refresh the list after deletion
        } catch (error) {
            console.error("Error deleting manager:", error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading managers.</div>;
    }

    return (
        <div>
            <h1>Manage Managers</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {managers?.map((manager) => (
                        <tr key={manager._id}>
                            <td>{manager.name}</td>
                            <td>{manager.email}</td>
                            <td>
                                <button onClick={() => handleDeleteManager(manager._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageManagers;

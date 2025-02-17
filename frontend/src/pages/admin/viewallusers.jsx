// ManageUsers.jsx
import { axiosInstance } from "../../config/axiosInstance";
import { useFetch } from "../../hooks/useFetch";

const ManageUsers = () => {
    const [users, isLoading, error, refetch] = useFetch("/admin/user");

    const handleDeleteUser = async (userId) => {
        try {
            await axiosInstance.delete(`/admin/user/${userId}`);
            refetch(); // Refresh the list after deletion
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading users.</div>;
    }

    return (
        <div>
            <h1>Manage Users</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;

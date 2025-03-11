import { useEffect, useState, useContext } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { ThemeContext } from "../../context/ThemeContext";
import toast from "react-hot-toast";

function ManageUsers() {
  const { theme } = useContext(ThemeContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const isDarkMode = theme === "dark";

  useEffect(() => {
    axiosInstance.get("/admin/user")
      .then(response => {
        setUsers(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users");
        setLoading(false);
      });
  }, []);

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/admin/user/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user. Please try again.");
    }
  };

  if (loading) return <p className="text-center text-lg text-black dark:text-white">Loading...</p>;

  return (
    <div className={`min-h-screen p-6 ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <h1 className="text-3xl font-bold text-center mb-6">Manage Users</h1>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 dark:border-gray-700 rounded-lg">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Name</th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Email</th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="text-center hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{user.name}</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{user.email}</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 dark:bg-red-600 text-white px-3 py-1 rounded hover:bg-red-600 dark:hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageUsers;

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearAdmin } from "../../redux/features/adminSlice";
import toast from "react-hot-toast";

export const AdminHeader = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(clearAdmin()); // ✅ Clear admin state from Redux
        localStorage.removeItem("adminToken"); // ✅ Remove token
        toast.success("Logged out successfully");
        navigate("/admin/login"); // ✅ Redirect to login
    };

    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <nav>
                <ul className="flex space-x-6">
                    <li>
                        <Link to="/admin/dashboard" className="hover:text-gray-300">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/admin/users" className="hover:text-gray-300">Users</Link>
                    </li>
                    <li>
                        <Link to="/admin/managers" className="hover:text-gray-300">Managers</Link>
                    </li>
                    <li>
                        <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">
                            Logout
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

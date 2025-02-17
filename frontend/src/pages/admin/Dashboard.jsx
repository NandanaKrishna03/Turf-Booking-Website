// AdminDashboard.jsx

import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { useFetch } from "../../hooks/useFetch";

const AdminDashboard = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [users, usersLoading, usersError] = useFetch("/admin/user");
    const [turfs, turfsLoading, turfsError] = useFetch("/admin/turfs");
    const [bookings, bookingsLoading, bookingsError] = useFetch("/admin/bookings");
    const [managers, managersLoading, managersError] = useFetch("/admin/getAllManagers");

    if (usersLoading || turfsLoading || bookingsLoading || managersLoading) {
        return <div>Loading...</div>;
    }

    if (usersError || turfsError || bookingsError || managersError) {
        return <div>Error loading data.</div>;
    }

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <div>
                <h2>Users: {users?.length}</h2>
                <h2>Turfs: {turfs?.length}</h2>
                <h2>Bookings: {bookings?.length}</h2>
                <h2>Managers: {managers?.length}</h2>
            </div>

            {/* Button to navigate to Manage Users page */}
            <button onClick={() => navigate('/admin/users')}>View All Users</button><br></br>

            {/* Button to navigate to Manage Users page */}
            <button onClick={() => navigate('/admin/getAllManagers')}>View All managers</button><br></br>

            {/* Button to navigate to Manage Users page */}
            <button onClick={() => navigate('/admin/viewturfs')}>View All Turfs</button>

            {/* Button to navigate to Manage Users page */}
            <button onClick={() => navigate('/admin/getallbooking')}>View All bookings</button>

        </div>
    );
};

export default AdminDashboard;

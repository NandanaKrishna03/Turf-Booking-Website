import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { useFetch } from "../../hooks/useFetch";

const AdminDashboard = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [users, usersLoading, usersError] = useFetch("/admin/user");
    const [turfs, turfsLoading, turfsError] = useFetch("/admin/turfs");
    const [bookings, bookingsLoading, bookingsError] = useFetch("/admin/bookings");
    const [managers, managersLoading, managersError] = useFetch("/admin/getAllManagers");

    // Check if any data is still loading
    if (usersLoading || turfsLoading || bookingsLoading || managersLoading) {
        return <div>Loading...</div>; // You could replace this with a spinner or animation for better UX
    }

    // If any of the fetches failed, display an error message
    if (usersError || turfsError || bookingsError || managersError) {
        return <div>Error loading data. Please try again later.</div>;
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

            <div>
                {/* Button to navigate to Manage Users page */}
                <button onClick={() => navigate('/admin/users')}>View All Users</button><br />

                {/* Button to navigate to Manage Managers page */}
                <button onClick={() => navigate('/admin/getAllManagers')}>View All Managers</button><br />

                {/* Button to navigate to Manage Turfs page */}
                <button onClick={() => navigate('/admin/viewturfs')}>View All Turfs</button><br />

                {/* Button to navigate to Manage Bookings page */}
                <button onClick={() => navigate('/admin/getallbooking')}>View All Bookings</button>
            </div>
        </div>
    );
};

export default AdminDashboard;

import { useFetch } from "../../hooks/useFetch";

const Dashboard = () => {
    const [data, isLoading, error] = useFetch("/admin/dashboard");

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <p>Total Managers: {data?.totalManagers}</p>
            <p>Total Users: {data?.totalUsers}</p>
        </div>
    );
};

export default Dashboard;

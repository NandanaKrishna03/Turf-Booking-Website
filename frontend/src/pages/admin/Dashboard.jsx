import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/admin/users" className="bg-blue-500 text-white p-4 rounded-lg shadow-lg text-center hover:bg-blue-600">Manage Users</Link>
        <Link to="/admin/managers" className="bg-green-500 text-white p-4 rounded-lg shadow-lg text-center hover:bg-green-600">Manage Managers</Link>
        <Link to="/admin/turfs" className="bg-yellow-500 text-white p-4 rounded-lg shadow-lg text-center hover:bg-yellow-600">Manage Turfs</Link>
        <Link to="/admin/bookings" className="bg-red-500 text-white p-4 rounded-lg shadow-lg text-center hover:bg-red-600">Manage Bookings</Link>
        
      </div>
    </div>
  );
}

export default Dashboard;


import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

function Dashboard() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-6 transition-all duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <h1 className="text-4xl font-extrabold mb-10">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 w-full max-w-6xl">
        <Link to="/admin/users" className="flex flex-col items-center p-6 bg-gray-800 text-white rounded-xl shadow-lg transform transition hover:scale-105 hover:shadow-2xl">
          <span className="text-2xl font-semibold mb-2">Users</span>
          <p className="text-sm opacity-75">Manage and oversee all user accounts</p>
        </Link>
        
        <Link to="/admin/managers" className="flex flex-col items-center p-6 bg-gray-800 text-white rounded-xl shadow-lg transform transition hover:scale-105 hover:shadow-2xl">
          <span className="text-2xl font-semibold mb-2">Managers</span>
          <p className="text-sm opacity-75">Assign roles and manage team leaders</p>
        </Link>
        
        <Link to="/admin/turfs" className="flex flex-col items-center p-6 bg-gray-800 text-white rounded-xl shadow-lg transform transition hover:scale-105 hover:shadow-2xl">
          <span className="text-2xl font-semibold mb-2">Turfs</span>
          <p className="text-sm opacity-75">Monitor and update turf details</p>
        </Link>
        
        <Link to="/admin/bookings" className="flex flex-col items-center p-6 bg-gray-800 text-white rounded-xl shadow-lg transform transition hover:scale-105 hover:shadow-2xl">
          <span className="text-2xl font-semibold mb-2">Bookings</span>
          <p className="text-sm opacity-75">View and manage all reservations</p>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;

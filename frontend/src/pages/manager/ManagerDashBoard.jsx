
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext"; // Import ThemeContext
import { useFetch } from "../../hooks/useFetch";


export const ManagerDashboard = () => {
  const [manager, isLoading, error] = useFetch("/manager/find-manager"); // Fetch manager details
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext); // Access current theme and toggle function

  // Handle loading state
  if (isLoading) {
    return <div className="p-6 min-h-screen bg-gray-100">Loading...</div>;
  }

  // Handle error state
  if (error) {
    return (
      <div className="p-6 min-h-screen bg-gray-100">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div
      className={`p-6 min-h-screen bg-cover bg-center flex flex-col justify-center items-center transition-all ${
        theme === "dark" ? "bg-dark-theme" : "bg-light-theme"
      }`}
      style={{
        backgroundImage: "url('https://your-image-link.com/background.jpg')", // Add your background image URL here
      }}
    >
      <h1 className="text-4xl font-bold text-white mb-6">Hello, {manager?.name} 👋</h1>
      
      {/* Theme Toggle Button */}
      
      
      <div className="flex flex-col md:flex-row gap-6 mt-8">
        <button
          onClick={() => navigate("/manager/add-turf")}
          className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white py-3 px-8 rounded-lg shadow-lg hover:scale-105 transform transition"
        >
          Add Turf
        </button>

        <button
          onClick={() => navigate("/manager/turfs")}
          className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 text-white py-3 px-8 rounded-lg shadow-lg hover:scale-105 transform transition"
        >
          My Turfs
        </button>

        <button
          onClick={() => navigate("/manager/profile")}
          className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 text-white py-3 px-8 rounded-lg shadow-lg hover:scale-105 transform transition"
        >
          Profile
        </button>
        <button
          onClick={() => navigate("/manager/profile-update")}
          className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 text-white py-3 px-8 rounded-lg shadow-lg hover:scale-105 transform transition"
        >
          Profile Update
        </button>
      </div>
    </div>
  );
};

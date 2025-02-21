import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { useFetch } from "../../hooks/useFetch";

export const ManagerDashboard = () => {
  const [manager, isLoading, error] = useFetch("/manager/find-manager");
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  if (isLoading) {
    return <div className={`p-6 min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>Loading...</div>;
  }

  if (error) {
    return (
      <div className={`p-6 min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div
      className={`p-6 min-h-screen flex flex-col justify-center items-center transition-all ${
        theme === "dark" ? "bg-green-900 text-white" : "bg-green-300 text-black"
      }`}
    >
      <h1 className="text-4xl font-bold mb-6">Hello, {manager?.name} 👋</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <button
          onClick={() => navigate("/manager/add-turf")}
          className="bg-white text-green-600 py-3 px-8 rounded-lg shadow-md hover:bg-green-500 hover:text-white transition"
        >
          Add Turf
        </button>

        <button
          onClick={() => navigate("/manager/turfs")}
          className="bg-white text-green-600 py-3 px-8 rounded-lg shadow-md hover:bg-green-500 hover:text-white transition"
        >
          My Turfs
        </button>

        <button
          onClick={() => navigate("/manager/profile")}
          className="bg-white text-green-600 py-3 px-8 rounded-lg shadow-md hover:bg-green-500 hover:text-white transition"
        >
          Profile
        </button>

        <button
          onClick={() => navigate("/manager/profile-update")}
          className="bg-white text-green-600 py-3 px-8 rounded-lg shadow-md hover:bg-green-500 hover:text-white transition"
        >
          Profile Update
        </button>
      </div>
    </div>
  );
};

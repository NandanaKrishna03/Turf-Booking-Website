import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

 export const ManagerDashboard = () => {
  const [manager, isLoading, error] = useFetch("/manager/find-manager"); // Fetch manager details
  const navigate = useNavigate();

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
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">Hello, {manager?.name} 👋</h1>
      <div className="mt-4">
        <button onClick={() => navigate("/manager/turfs")} className="btn btn-primary mr-4">
          My Turfs
        </button>
       
        <button onClick={() => navigate("/manager/profile-update")} className="btn btn-secondary">
          Profile Update
        </button>
       
         
        

      </div>
    </div>
  );
};
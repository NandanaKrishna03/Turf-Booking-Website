import { useFetch } from "../../hooks/useFetch";


export const ManagerProfile = () => {
    const [manager, isLoading, error] = useFetch("/manager/find-manager");
  
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
  
    return (
      <div className="p-6 bg-gray-100">
        <h2 className="text-2xl font-bold">Profile</h2>
        <p>Name: {manager.name}</p>
        <p>Email: {manager.email}</p>
        <p>Phone: {manager.phoneNumber}</p>
      </div>
    );
  };
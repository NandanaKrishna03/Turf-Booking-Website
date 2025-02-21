
import { useFetch } from "../../hooks/useFetch";

export const ManagerProfile = () => {
  const [manager, isLoading, error] = useFetch("/manager/find-manager");

  if (isLoading) return <div className="flex justify-center items-center h-screen text-xl text-gray-500">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-xl text-red-500">Error: {error.message}</div>;

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg mt-10">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Manager Profile</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-lg text-gray-600 font-medium">Name:</p>
          <p className="text-lg text-gray-800">{manager.name}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-lg text-gray-600 font-medium">Email:</p>
          <p className="text-lg text-gray-800">{manager.email}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-lg text-gray-600 font-medium">Phone:</p>
          <p className="text-lg text-gray-800">{manager.phoneNumber}</p>
        </div>
      </div>
    </div>
  );
};

import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { useFetch } from "../../hooks/useFetch";

export const ManagerProfile = () => {
  const { theme } = useContext(ThemeContext);
  const [manager, isLoading, error] = useFetch("/manager/find-manager");

  if (isLoading) 
    return <div className={`flex justify-center items-center h-screen text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>Loading...</div>;
  if (error) 
    return <div className={`flex justify-center items-center h-screen text-xl ${theme === 'dark' ? 'text-red-400' : 'text-red-500'}`}>Error: {error.message}</div>;

  return (
    <div className={`min-h-screen flex justify-center items-center transition-all duration-300 ${theme === 'dark' ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-lg w-full mx-4 p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center">Manager Profile</h2>
        <div className="space-y-6">
          <div className="flex flex-col border-b pb-3">
            <p className="text-lg font-medium text-gray-500">Name</p>
            <p className="text-xl font-semibold">{manager.name}</p>
          </div>
          <div className="flex flex-col border-b pb-3">
            <p className="text-lg font-medium text-gray-500">Email</p>
            <p className="text-xl font-semibold">{manager.email}</p>
          </div>
          <div className="flex flex-col border-b pb-3">
            <p className="text-lg font-medium text-gray-500">Phone</p>
            <p className="text-xl font-semibold">{manager.phoneNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

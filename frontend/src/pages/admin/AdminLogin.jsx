import { useDispatch } from "react-redux";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { saveAdmin } from "../../redux/features/adminSlice";
import { ThemeContext } from "../../context/ThemeContext";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axiosInstance.post("/admin/login", { email, password });

      if (response.data && response.data.data && response.data.data.role) {
        const { role, token, admin } = response.data.data;
        localStorage.setItem("role", role);
        localStorage.setItem("token", token);
        dispatch(saveAdmin(admin));
        alert("Login Successful");

        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      } else {
        setError("Invalid response from the server.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className={`flex items-center justify-center h-screen transition-all duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div className={`p-8 rounded-lg shadow-md w-96 transition-all duration-300 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

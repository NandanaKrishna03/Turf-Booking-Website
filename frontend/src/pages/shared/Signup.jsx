import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate, useLocation } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext"; // Import ThemeContext

export const Signup = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { register, handleSubmit, watch } = useForm();
    const [errorMessage, setErrorMessage] = useState("");
    const { theme } = useContext(ThemeContext); // Get theme context

    const isManagerSignup = location.pathname.includes("/manager");

    // Extract values outside of useEffect
    const password = watch("password");
    const confirmPassword = watch("confirmPassword");

    useEffect(() => {
        setErrorMessage(""); // Clear error when user types
    }, [password, confirmPassword]);

    const onSubmit = async (data) => {
        if (data.password !== data.confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }

        try {
            const signupAPI = isManagerSignup ? "/manager/signup" : "/user/signup";
            const response = await axiosInstance.post(signupAPI, data);

            if (response?.data?.token) {
                localStorage.setItem("token", response.data.token);
            }

            navigate(isManagerSignup ? "/manager/dashboard" : "/user/profile");
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Something went wrong. Please try again.");
        }
    };

    return (
        <div className={`relative w-full min-h-screen flex justify-center items-center transition-colors duration-300 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
            {/* Background Video */}
            <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover z-0">
                <source src="https://res.cloudinary.com/dk1kmtpwe/video/upload/v1740154000/158633-817153726_j4idvn.mp4" type="video/mp4" />
            </video>

            {/* Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>

            {/* Signup Form */}
            <div className={`relative w-full max-w-md p-8 rounded-lg shadow-lg z-20 transition-colors duration-300 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
                <h2 className="text-center text-2xl font-bold">Create an Account</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                    <input type="text" placeholder="Name" {...register("name")} className={`input input-bordered w-full ${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"}`} required />
                    <input type="email" placeholder="Email" {...register("email")} className={`input input-bordered w-full ${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"}`} required />
                    <input type="password" placeholder="Password" {...register("password")} className={`input input-bordered w-full ${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"}`} required />
                    <input type="password" placeholder="Confirm Password" {...register("confirmPassword")} className={`input input-bordered w-full ${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"}`} required />

                    {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

                    <button type="submit" className="btn btn-primary w-full">Sign Up</button>
                </form>

                <p className="mt-4 text-center">
                    Already have an account? {" "}
                    <button onClick={() => navigate(isManagerSignup ? "/manager/login" : "/user/login")} className="text-blue-600 underline">
                        Sign in
                    </button>
                </p>
            </div>
        </div>
    );
};

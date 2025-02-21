import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate, useLocation } from "react-router-dom";

export const Signup = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { register, handleSubmit, watch } = useForm();
    const [errorMessage, setErrorMessage] = useState("");

    const isManagerSignup = location.pathname.includes("/manager");

    // Extract values outside of useEffect
    const password = watch("password");
    const confirmPassword = watch("confirmPassword");

    useEffect(() => {
        setErrorMessage(""); // Clear error when user types
    }, [password, confirmPassword]); // Simple dependency array

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
        
            <div className="relative w-full min-h-screen flex justify-center items-center">
                {/* Background Video */}
                <video
                    autoPlay
                    loop
                    muted
                    className="absolute top-0 left-0 w-full h-full object-cover"
                >
                    <source src="https://res.cloudinary.com/dk1kmtpwe/video/upload/v1740154000/158633-817153726_j4idvn.mp4" type="video/mp4" />
                </video>
    
                {/* Overlay */}
               
    
                {/* Signup Form */}
                <div className="relative w-full max-w-md bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
                    <h2 className="text-center text-2xl font-bold">Create an Account</h2>
    
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                        <input type="text" placeholder="Name" {...register("name")} className="input input-bordered w-full" required />
                        <input type="email" placeholder="Email" {...register("email")} className="input input-bordered w-full" required />
                        <input type="password" placeholder="Password" {...register("password")} className="input input-bordered w-full" required />
                        <input type="password" placeholder="Confirm Password" {...register("confirmPassword")} className="input input-bordered w-full" required />
    
                        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
    
                        <button type="submit" className="btn btn-primary w-full">Sign Up</button>
                    </form>
    
                    <p className="mt-4 text-center">
                        Already have an account?{" "}
                        <button onClick={() => navigate(isManagerSignup ? "/manager/login" : "/user/login")} className="text-blue-600 underline">
                            Sign in
                        </button>
                    </p>
                </div>
            </div>
    );
};

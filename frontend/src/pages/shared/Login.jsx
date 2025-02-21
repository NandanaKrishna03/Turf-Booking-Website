/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../config/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser, saveUser } from "../../redux/features/userSlice";
import { clearManager, saveManager } from "../../redux/features/managerSlice";
import toast from "react-hot-toast";

export const Login = ({ role }) => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Role-based configurations
    const roleConfig = {
        user: {
            loginAPI: "/user/login",
            profileRoute: "/",
            signupRoute: "/signup",
            saveAction: saveUser,
            clearAction: clearUser,
            tokenKey: "userToken",
            dataKey: "userData",
        },
        manager: {
            loginAPI: "/manager/login",
            profileRoute: "/manager/dashboard",
            signupRoute: "/manager/signup",
            saveAction: saveManager,
            clearAction: clearManager,
            tokenKey: "managerToken",
            dataKey: "managerData",
        },
    };

    const config = roleConfig[role] || roleConfig.user;

    const onSubmit = async (data) => {
        try {
            const response = await axiosInstance.post(config.loginAPI, data, { withCredentials: true });

            const token = response?.data?.token;
            if (token) {
                localStorage.setItem(config.tokenKey, token);
                localStorage.setItem(config.dataKey, JSON.stringify(response?.data?.data));
                axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
            }

            dispatch(config.saveAction(response?.data?.data));

            toast.success("Login successful");
            navigate(config.profileRoute);
        } catch (error) {
            console.error("Login Error:", error);
            dispatch(config.clearAction());

            const errorMessage = error.response?.data?.message || "Login Failed. Please try again.";
            toast.error(errorMessage);
        }
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="https://res.cloudinary.com/dk1kmtpwe/video/upload/v1740154000/158633-817153726_j4idvn.mp4" type="video/mp4" />
      </video>
      
      {/* Overlay */}
      

      {/* Login Form */}
      <div className="hero-content flex-col lg:flex-row-reverse z-20 p-6">
        <div className="text-center lg:text-left text-white">
          <h1 className="text-5xl font-bold">Login now! {role}</h1>
          <p className="py-6">Welcome back! Please log in to continue.</p>
        </div>

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl p-6">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className="input input-bordered text-black placeholder-gray-400"
                required
            />

            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                {...register("password")}
                className="input input-bordered text-black placeholder-gray-400"
                required
              />
              <div className="flex items-center justify-between">
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover text-gray-400">
                    Forgot password?
                  </a>
                </label>
                <label className="label">
                  <Link to={config.signupRoute} className="label-text-alt link link-hover text-gray-400">
                    New User?
                  </Link>
                </label>
              </div>
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    );
};

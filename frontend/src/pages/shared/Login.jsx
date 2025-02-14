/* eslint-disable react/prop-types */

import { useForm } from "react-hook-form";
import { axiosInstance } from "../../config/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser, saveUser } from "../../redux/features/userSlice";
import { clearManager, saveManager } from "../../redux/features/managerSlice";

import toast from "react-hot-toast";
import { clearAdmin, saveAdmin } from "../../redux/features/adminSlice";




export const Login = ({ role }) => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Role-based configurations
    const userConfig = {
        user: {
            loginAPI: "/user/login",
            profileRoute: "/user/profile",
            signupRoute: "/signup",
            saveAction: saveUser,
            clearAction: clearUser,
        },
        manager: {
            loginAPI: "/manager/login",
            profileRoute: "/manager/dashboard",
            signupRoute: "/manager/signup",
            saveAction: saveManager,
            clearAction: clearManager,
        },
        admin: {
            loginAPI: "/admin/login",
            profileRoute: "/admin/dashboard",
            signupRoute: "/admin/signup",
            saveAction: saveAdmin,
            clearAction: clearAdmin,
        },
    };

    const config = userConfig[role] || userConfig.user;

    const onSubmit = async (data) => {
        try {
            const response = await axiosInstance.post(config.loginAPI, data);
            console.log("Login response:", response);
            dispatch(config.saveAction(response?.data?.data));
            toast.success("Login successful");
            navigate(config.profileRoute);
        } catch (error) {
            dispatch(config.clearAction());
            toast.error("Login Failed");
            console.log(error);
        }
    };

    return (
        <div className="hero bg-base-200 min-h-screen text-base-content">
        <div className="hero-content flex-col lg:flex-row-reverse">
            {/* Text Section */}
            <div className="text-center lg:text-left">
                <h1 className="text-5xl font-bold">Login now! {role}</h1>
                <p className="py-6">Welcome back! Please log in to continue.</p>
            </div>

            {/* Form Section */}
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                    {/* Email Input */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Email"
                            {...register("email")}
                            className="input input-bordered"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Password"
                            {...register("password")}
                            className="input input-bordered"
                            required
                        />
                        <div className="flex items-center justify-between">
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">
                                    Forgot password?
                                </a>
                            </label>
                            <label className="label">
                                <Link to={config.signupRoute} className="label-text-alt link link-hover">
                                    New User?
                                </Link>
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    );
};

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { saveUser } from "../redux/features/userSlice";
// Import the correct action

export const ProtectedRoute = () => {
    const { isUserAuth } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("userToken");
        const userData = JSON.parse(localStorage.getItem("userData"));

        if (token && userData && !isUserAuth) {
            dispatch(saveUser(userData)); // Restore user authentication from localStorage
        } else if (!token) {
            navigate("/user/login", { replace: true });
        }
    }, [isUserAuth, navigate, dispatch]);

    if (!isUserAuth) return null; // Prevents flickering before redirect

    return <Outlet />;
};

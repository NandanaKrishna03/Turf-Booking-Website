import { CircleUser, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import Darkmode from "../shared/Darkmode";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { clearUser } from "../../redux/features/userSlice";
import { useState } from "react";

export const UserHeader = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogOut = async () => {
        try {
            await axiosInstance.get("/user/logout");
            dispatch(clearUser());
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex justify-between items-center w-full px-20 h-24 shadow-2xl relative">
            <Link to={"/"}>
                <div className="text-3xl font-bold">Logo</div>
            </Link>
            <nav className="flex gap-16 items-center font-semibold">
                <Link to={"/"}>Home</Link>
                <Link to={"/about"}>About</Link>
                <Link to={"/turfs"}>Turfs</Link>
                
            </nav>

            <div className="flex gap-14 items-center">
                <Link to={"/user/cart"}>
                    <ShoppingBag />
                </Link>

                {/* Profile Dropdown */}
                <div className="relative">
                    <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        <CircleUser />
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-md">
                            <Link 
                                to={"/user/profile"} 
                                className="block px-4 py-2 hover:bg-gray-100"
                                onClick={() => setIsDropdownOpen(false)}
                            >
                                Profile
                            </Link>
                            <Link 
                                to={"/user/profile-update"} 
                                className="block px-4 py-2 hover:bg-gray-100"
                                onClick={() => setIsDropdownOpen(false)}
                            >
                                Update Profile
                            </Link>
                        </div>
                    )}
                </div>

                <Darkmode />
                <button className="btn btn-accent" onClick={handleLogOut}>
                    Logout
                </button>
            </div>
        </div>
    );
};

import { CircleUser } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Darkmode from "../shared/Darkmode";
import { useDispatch} from "react-redux";
import { axiosInstance } from "../../config/axiosInstance";
import { clearManager } from "../../redux/features/managerSlice";
import { useState } from "react";

export const ManagerHeader = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
     

    const handleLogOut = async () => {
        try {
            await axiosInstance.get("/manager/logout");
            dispatch(clearManager());
            navigate("/manager/login");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex justify-between items-center w-full px-20 h-24 shadow-2xl relative">
           <Link to={"/manager/dashboard"}>
            <img src="https://res.cloudinary.com/dk1kmtpwe/image/upload/v1740064302/Screenshot_245_ru80e2.png" alt="" width="200"/>

            </Link>

            <nav className="flex gap-16 items-center font-semibold">
                <Link to={"/manager/dashboard"}>Dashboard</Link>
                <Link to={"/manager/turfs"}>My Turfs</Link>
                <Link to={"/manager/bookings"}>Bookings</Link>
            </nav>

            <div className="flex gap-10 items-center">
                {/* Profile Dropdown */}
                <div className="relative">
                    <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        <CircleUser />
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-md">
                            <Link 
                                to={"/manager/profile"} 
                                className="block px-4 py-2 hover:bg-gray-100"
                                onClick={() => setIsDropdownOpen(false)}
                            >
                                Profile
                            </Link>
                            <Link 
                                to={"/manager/profile-update"} 
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

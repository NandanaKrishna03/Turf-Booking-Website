import { CircleUser} from "lucide-react";
import { Link } from "react-router-dom";
import Darkmode from "../shared/Darkmode";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { clearUser } from "../../redux/features/userSlice";


export const UserHeader = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    

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
            <img src="c:\Users\DELL\Downloads\the playfull logo of word TurfNation with slogan 'Book and play like a pro.' with no background (1).jpg" alt="" />
        </Link>

        {/* Navbar Links */}
        <nav className="flex gap-16 items-center font-semibold text-lg">
            <Link to={"/"} className="hover:text-blue-500">Home</Link>
            <Link to={"/about"} className="hover:text-blue-500">About</Link>
            <Link to={"/turfs"} className="hover:text-blue-500">Turfs</Link>
        </nav>

        <div className="flex gap-14 items-center">
            {/* Profile Icon (Navigates to Profile Page) */}
            <Link to={"/user/profile"}>
                <CircleUser className="cursor-pointer text-xl" />
            </Link>

            {/* Darkmode Toggle */}
            <Darkmode />

            {/* Logout Button */}
            <button className="btn btn-accent" onClick={handleLogOut}>
                Logout
            </button>
        </div>
    </div>
    );
};

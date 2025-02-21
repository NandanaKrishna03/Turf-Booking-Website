import { Link, useNavigate } from "react-router-dom";
import Darkmode from "../shared/Darkmode";

export const Header = () => {
    const navigate = useNavigate();

    return (
        <div className="flex justify-between items-center px-14 h-20   shadow-2xl">
            <Link to={"/"}>
            <img src="https://res.cloudinary.com/dk1kmtpwe/image/upload/v1740064302/Screenshot_245_ru80e2.png" alt="" width="200"/>

            </Link>
            <div className="flex justify-center items-center gap-16">
                <nav>
                    <ul className="flex justify-center items-center gap-10 text-md">
                        <Link to={"/"} className="hover:text-gray-400">
                            <li>Home</li>
                        </Link>
                        <Link to={"/about"} className="hover:text-gray-400">
                            <li>About</li>
                        </Link>
                        <Link to={"/turfs"} className="hover:text-gray-400">
                            <li>Turfs</li>
                        </Link>
                    </ul>
                </nav>
                <div className="flex justify-center gap-3">
                    <button className="btn btn-primary" onClick={() => navigate('user/signup')}>
                        Join Us
                    </button>
                    <Darkmode/>
                </div>
            </div>
        </div>
    );
};

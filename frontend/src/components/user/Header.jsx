import { Link, useNavigate } from "react-router-dom";
import Darkmode from "../shared/Darkmode";

export const Header = () => {
    const navigate = useNavigate();

    return (
        <div className="flex justify-between items-center px-14 h-20   shadow-2xl">
            <div>
                <h1 className="text-3xl font-bold">TurfNation</h1>
            </div>
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

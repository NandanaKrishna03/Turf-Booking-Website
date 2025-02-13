import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
    const navigate = useNavigate();

    return (
        <div className="flex justify-between items-center px-14 h-20 shadow-2xl">
            <div><h1 className="text-3xl font-bold">Logo</h1></div>
            <nav>
                <ul className="flex gap-10 text-md">
                    <Link to={"/"}><li>Home</li></Link>
                    <Link to={"/about"}><li>About</li></Link>
                    <Link to={"/turfs"}><li>Turfs</li></Link>
                </ul>
            </nav>
            <button className="btn btn-primary" onClick={() => navigate('/user/signup')}>Join Us</button>
        </div>
    );
};

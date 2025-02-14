import { Link} from "react-router-dom";

export const Header = () => {
    

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
            <Link to="/manager/signup" className="btn btn-primary">Join Us</Link>

        </div>
    );
};

import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Link } from "react-router-dom";

export const Footer = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <footer className={`${theme === "dark" ? "bg-gray-900 text-gray-300" : "bg-gray-100 text-gray-700"} px-10 py-16`}>
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between">
                
                {/* Logo & Copyright Section */}
                <div className="mb-10 lg:mb-0">
                    <img 
                        src="https://res.cloudinary.com/dk1kmtpwe/image/upload/v1740064302/Screenshot_245_ru80e2.png" 
                        alt="Logo" 
                        width="150"
                    />
                    <p className="mt-4 text-sm">
                        © 2025 Techmash Solutions Pvt. Ltd.  
                        <br />All Rights Reserved.
                    </p>
                </div>

                {/* Company Links */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    
                    <div>
                        <h6 className="font-semibold text-lg mb-4">Company</h6>
                        <ul className="space-y-2">
                            <li><Link to="#" className="hover:text-gray-500">About Us</Link></li>
                            <li><Link to="#" className="hover:text-gray-500">Learn</Link></li>
                            <li><Link to="#" className="hover:text-gray-500">Contact</Link></li>
                            <li><Link to="#" className="hover:text-gray-500">Careers</Link></li>
                            <li><Link to="/manager/login" className="hover:text-gray-500">Partner with Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h6 className="font-semibold text-lg mb-4">Social</h6>
                        <ul className="space-y-2">
                            <li><Link to="#" className="hover:text-gray-500">Instagram</Link></li>
                            <li><Link to="#" className="hover:text-gray-500">Facebook</Link></li>
                            <li><Link to="#" className="hover:text-gray-500">LinkedIn</Link></li>
                            <li><Link to="#" className="hover:text-gray-500">Twitter</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h6 className="font-semibold text-lg mb-4">Privacy & Terms</h6>
                        <ul className="space-y-2">
                            <li><Link to="#" className="hover:text-gray-500">FAQs</Link></li>
                            <li><Link to="#" className="hover:text-gray-500">Privacy Policy</Link></li>
                            <li><Link to="#" className="hover:text-gray-500">Terms of Service</Link></li>
                            <li><Link to="#" className="hover:text-gray-500">Cancellation Policy</Link></li>
                        </ul>
                    </div>
                </div>

                {/* QR Code for App Download */}
                <div className="mt-10 lg:mt-0 flex flex-col items-center">
                    <div className={`${theme === "dark" ? "bg-gray-800" : "bg-gray-300"} p-4 rounded-lg`}>
                        <p className="text-sm font-semibold mb-2 text-center">DOWNLOAD THE APP</p>
                        <img 
                            src="https://res.cloudinary.com/dk1kmtpwe/image/upload/v1740565999/TurfNation_qbmtzd.png" 
                            alt="QR Code" 
                            className="w-24 h-24"
                        />
                    </div>
                </div>
            </div>
        </footer>
    );
};

import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import { useContext, useState } from "react";
import { AuthContext } from "../Authentication/AuthContext";

const Responsive = ({ showMenu, setShowMenu }) => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);

    if (!authContext) {
        console.error("AuthContext is not available. Make sure AuthProvider is wrapping your application.");
        return null;
    }

    const { user, logout } = authContext;

    const handleLogout = () => {
        logout();
        navigate("/");
        setShowMenu(false);
    };

    return (
        <div className={`fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white px-8 pb-6 pt-16 text-black lg:hidden rounded-r-xl shadow-md transition-all duration-300 ${
            showMenu ? "left-0" : "-left-full"
        }`}>
            <div>
                {/* User Info */}
                <div className="flex items-center justify-between gap-3 pb-2 border-b-1">
                    <div className="flex items-center gap-3">
                        <FaUserCircle size={50} className="text-red-500" />
                        <div>
                            <h1>Hello {user ? user.name.toUpperCase() : "Guest"}</h1>
                            {!user ? (
                                <Link to="/login" className="text-sm text-red-500">Login</Link>
                            ) : (
                                <button onClick={() => setShowDropdown(!showDropdown)} className="text-sm text-gray-500 flex items-center gap-1">
                                    Premium User
                                </button>
                            )}
                        </div>
                    </div>
                    {user && (
                        <button onClick={handleLogout} className="text-red-500 text-sm cursor-pointer">
                            Logout
                        </button>
                    )}
                </div>

                {/* Navigation */}
                <nav className="mt-10">
                    <ul className="flex flex-col space-y-2 text-sm">
                        <Link to="/"><li className="text-red-500 font-semibold">HOME</li></Link>
                        <Link to="/about"><li className="uppercase hover:text-red-500">About</li></Link>
                        <Link to="/contact"><li className="uppercase hover:text-red-500">Contact</li></Link>
                        <Link to="/sofa"><li className="uppercase hover:bg-gray-100">Sofa</li></Link>
                        <Link to="/bed"><li className="uppercase hover:bg-gray-100">Bed</li></Link>
                        <Link to="/wardrobe"><li className="uppercase hover:bg-gray-100">Wardrobe</li></Link>
                        <Link to="/chair"><li className="uppercase hover:bg-gray-100">Chair</li></Link>
                        <Link to="/table"><li className="uppercase hover:bg-gray-100">Table</li></Link>
                        <Link to="/cabinets"><li className="uppercase hover:bg-gray-100">Cabinet</li></Link>
                        <Link to="/homedecors"><li className="uppercase hover:bg-gray-100">Home Decors</li></Link>
                        <Link to="/cushions"><li className="uppercase hover:bg-gray-100">Cushion</li></Link>
                        
                        {user && (
                            <Link to="/orderhistory">
                                <li className="uppercase font-semibold">My Orders</li>
                            </Link>
                        )}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Responsive;

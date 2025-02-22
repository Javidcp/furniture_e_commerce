import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { useEffect, useState } from "react";

const Responsive = ({ showMenu, setShowMenu, isOpen, setIsOpen }) => {
    const [userName, setUserName] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("userName");
        if (storedUser) {
            setUserName(storedUser);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userName");
        setUserName(null);
        navigate("/login");
        window.location.reload();
    };

    return (
        <div className={`fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white px-8 pb-6 pt-16 text-black lg:hidden rounded-r-xl shadow-md transition-all duration-300 ${
            showMenu ? "left-0" : "-left-full"
        }`}>
            <div>
                {/* User Info */}
                <div className="flex items-center justify-between gap-3 pb-2 border-b-1">
                    <div className="flex items-center gap-3">
                        <FaUserCircle size={50} />
                        <div>
                            <h1>Hello {userName ? userName : "Guest"}</h1>
                            {userName ? (
                                <h1 className="text-sm text-slate-500">Premium User</h1>
                            ) : (
                                <Link to="/login" className="text-sm text-red-500">Login</Link>
                            )}
                        </div>
                    </div>
                    {userName && (
                        <button onClick={handleLogout} className="text-red-500 text-sm cursor-pointer">
                            Logout
                        </button>
                    )}
                </div>

                {/* Navigation */}
                <nav className="mt-12">
                    <ul className="flex flex-col space-y-4 text-xl">
                        <Link to="/"><li className="text-red-500 font-semibold">HOME</li></Link>
                        <Link to='/sofa'><li className="uppercase py-1 hover:bg-gray-100">Sofa</li></Link>
                        <Link to='/bed'><li className="uppercase py-1 hover:bg-gray-100">Bed</li></Link>
                        <Link to='/wardrobe'><li className="uppercase py-1 hover:bg-gray-100">Wardrobe</li></Link>
                        <Link to='/chair'><li className="uppercase py-1 hover:bg-gray-100">Chair</li></Link>
                        <Link to='/table'><li className="uppercase py-1 hover:bg-gray-100">Table</li></Link>
                        <Link to='/cabinets'><li className="uppercase py-1 hover:bg-gray-100">Cabinet</li></Link>
                        <Link to='/homedecors'><li className="uppercase py-1 hover:bg-gray-100">Home Decors</li></Link>
                        <Link to='/cushions'><li className="uppercase py-1 hover:bg-gray-100">Cushion</li></Link>
                        <Link to='/about' className="uppercase hover:text-red-500">About</Link>
                        <Link to='/contact' className="uppercase hover:text-red-500">Contact</Link>
                        {/* Orders Page - Only Visible When Logged In */}
                        {userName && (
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

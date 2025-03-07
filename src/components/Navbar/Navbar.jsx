import { useContext, useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import Responsive from "../Navbar/Responsive";
import { CartContext } from "../cart/CartContext";
import { AuthContext } from "../Authentication/AuthContext"; // Import AuthContext

const Navbar = () => {
    const { cart } = useContext(CartContext);
    const authContext = useContext(AuthContext); // Check if context exists
    const [showMenu, setShowMenu] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
    

    if (!authContext) {
        console.error("AuthContext is not available. Make sure AuthProvider is wrapping your application.");
        return null;
    }

    const { user, logout } = authContext; // Now it's safe to destructure

    const toggle = () => {
        setShowMenu((prev) => !prev);
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div className="bg-white sm:px-4 fixed w-full z-50 shadow-sm top-0 shadow-gray-100" style={{ fontFamily: 'sans-serif' }}>
            <div className="max-w-7xl mx-auto py-3 px-5 sm:px-15.5 flex justify-between items-center">
                <Link to="/"><div className='text-2xl font-extrabold'>HOME<span className="text-red-500">HAVEN</span></div></Link>

                <div className="flex items-center gap-5 hidden lg:block">
                    <nav>
                        <ul className="flex items-center text-sm font-medium gap-5">
                            <Link to='/'><li className="text-red-500 font-semibold">HOME</li></Link>

                            {/* Dropdown Button */}
                            <div className="relative inline-block" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
                                <button className="cursor-pointer flex uppercase items-center justify-between gap-1 px-0 py-2">
                                    collections<span>{isOpen ? <IoMdArrowDropup size={15} /> : <IoMdArrowDropdown size={15} />}</span>
                                </button>
                                {isOpen && (
                                    <ul className="absolute left-0 w-40 bg-white" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
                                        <Link to='/sofa'><li className="uppercase py-2 px-3 hover:bg-gray-100 hover:text-red-500">Sofa</li></Link>
                                        <Link to='/bed'><li className="uppercase py-2 px-3 hover:bg-gray-100 hover:text-red-500">Bed</li></Link>
                                        <Link to='/wardrobe'><li className="uppercase py-2 px-3 hover:bg-gray-100 hover:text-red-500">Wardrobe</li></Link>
                                        <Link to='/chair'><li className="uppercase py-2 px-3 hover:bg-gray-100 hover:text-red-500">Chair</li></Link>
                                        <Link to='/table'><li className="uppercase py-2 px-3 hover:bg-gray-100 hover:text-red-500">Table</li></Link>
                                        <Link to='/cabinets'><li className="uppercase py-2 px-3 hover:bg-gray-100 hover:text-red-500">Cabinet</li></Link>
                                        <Link to='/homedecors'><li className="uppercase py-2 px-3 hover:bg-gray-100 hover:text-red-500">Home Decors</li></Link>
                                        <Link to='/cushions'><li className="uppercase py-2 px-3 hover:bg-gray-100 hover:text-red-500">Cushion</li></Link>
                                    </ul>
                                )}
                            </div>
                            <Link to='/about' className="uppercase hover:text-red-500">About</Link>
                            <Link to='/contact' className="uppercase hover:text-red-500">Contact</Link>
                        </ul>
                    </nav>
                </div>

                <div className="flex items-center gap-5 text-xs lg:text-sm">
                    {/* Conditional rendering for login dropdown */}
                    {!user ? (
                        <Link to='/login'>
                            <button className="cursor-pointer hidden md:block px-4 border border-red-500 py-2 rounded-3xl text-red-500 hover:bg-red-500 hover:text-white">
                                Login
                            </button>
                        </Link>
                    ) : (
                        <div className="relative hidden md:block">
                            {/* User Button */}
                            <button
                                className="flex items-center gap-2 px-3 py-2 border rounded-3xl border-gray-300 hover:bg-gray-200"
                                onClick={() => setShowDropdown(!showDropdown)}
                            >
                                <FaUserCircle size={20} className="text-red-500" />
                                {user.name.toUpperCase()}
                                <IoMdArrowDropdown />
                            </button>

                            {/* Dropdown Menu */}
                            {showDropdown && (
                                <ul
                                    className="absolute left-0 w-40 bg-white"
                                    onMouseEnter={() => setShowDropdown(true)}
                                    onMouseLeave={() => setShowDropdown(false)}
                                >
                                    <Link to="/orderhistory">
                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Orders</li>
                                    </Link>
                                    <li className="px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>
                                        Logout
                                    </li>
                                </ul>
                            )}
                        </div>
                    )}

                    {/* Cart Button - Prevents Non-Logged Users from Accessing */}
                    <button
                        className="relative bg-amber-50 p-2 rounded-2xl"
                        onClick={() => {
                            if (!user) {
                                alert("You need to log in to access the cart.");
                                navigate("/login");
                            } else {
                                navigate("/cart");
                            }
                        }}
                    >
                        <IoCartOutline className="w-4.5 h-4.5" />
                        {cart.length > 0 && user && (
                            <div className="bg-red-500 w-3 h-3.5 absolute -top-1 right-0 text-[10px] text-center rounded-full text-white">
                                {cart.length}
                            </div>
                        )}
                    </button>

                    {showMenu ? (
                        <HiMenuAlt1 onClick={toggle} className="cursor-pointer transition-all lg:hidden" size={30} />
                    ) : (
                        <HiMenuAlt3 onClick={toggle} className="cursor-pointer transition-all lg:hidden" size={30} />
                    )}
                </div>
            </div>
            <Responsive showMenu={showMenu} setShowMenu={setShowMenu} isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    );
};

export default Navbar;

import { useContext, useState, useEffect } from "react";
import { IoCartOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import Responsive from "../Navbar/Responsive";
import { CartContext } from "../cart/CartContext";
import { useWishlist } from '../wishlist/wishlistContext'
import { AuthContext } from "../Authentication/AuthContext";
import Swal from "sweetalert2";
import SearchButton from "./SearchButton";
import { GoHeart } from "react-icons/go";

import "@fontsource/montserrat";


const Navbar = () => {
    const { cart } = useContext(CartContext);
    const authContext = useContext(AuthContext);
    const [showMenu, setShowMenu] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const { wishlist } = useWishlist()

    useEffect(() => {
        const handleScroll = () => {
        setScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    

    if (!authContext) {
        console.error("AuthContext is not available");
        return null;
    }

    const { user, logout } = authContext;

    const toggle = () => {
        setShowMenu((prev) => !prev);
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        
        <div className={`fixed  ${scrolled ? 'bg-[#f5f5f5] shadow-md': ''} w-full z-40 top-0 `} style={{ fontFamily: 'sans-serif' }}>
            <div className="max-w-7xl mx-auto py-3 px-2 flex justify-between items-center">
                <Link to="/"><div className={`text-2xl font-extrabold ${scrolled ? 'text-black':''}`}>HOME<span className="text-[#2d9596]">HEAVEN</span></div></Link>

                <div className=" items-center gap-5 hidden lg:block">
                    <nav>
                        <ul className="flex items-center text-sm font-medium gap-5">
                            <Link to='/'><li className="text-[#2d9596] font-semibold" style={{fontFamily : "Montserrat, sans-serif"}}>HOME</li></Link>

                            {/* Dropdown Button */}
                            <div className="relative inline-block \" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
                                <button className={`cursor-pointer flex uppercase items-center justify-between gap-1 px-0 py-2 ${scrolled ? 'text-black':''}`} style={{fontFamily : "Montserrat, sans-serif"}}>
                                    collections<span>{isOpen ? <IoMdArrowDropup size={15} /> : <IoMdArrowDropdown size={15} />}</span>
                                </button>
                                {isOpen && (
                                    <ul className="absolute left-0 top-6 z-30 w-40 bg-white" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setTimeout(setIsOpen(false), 1000)}>
                                        <Link to='/sofa'><li className="uppercase py-2 px-3 hover:bg-gray-100 hover:text-[#2d9596]">Sofa</li></Link>
                                        <Link to='/bed'><li className="uppercase py-2 px-3 hover:bg-gray-100 hover:text-[#2d9596]">Bed</li></Link>
                                        <Link to='/wardrobe'><li className="uppercase py-2 px-3 hover:bg-gray-100 hover:text-[#2d9596]">Wardrobe</li></Link>
                                        <Link to='/chair'><li className="uppercase py-2 px-3 hover:bg-gray-100 hover:text-[#2d9596]">Chair</li></Link>
                                        <Link to='/table'><li className="uppercase py-2 px-3 hover:bg-gray-100 hover:text-[#2d9596]">Table</li></Link>
                                        <Link to='/cabinets'><li className="uppercase py-2 px-3 hover:bg-gray-100 hover:text-[#2d9596]">Cabinet</li></Link>
                                        <Link to='/homedecors'><li className="uppercase py-2 px-3 hover:bg-gray-100 hover:text-[#2d9596]">Home Decors</li></Link>
                                        <Link to='/cushions'><li className="uppercase py-2 px-3 hover:bg-gray-100 hover:text-[#2d9596]">Cushion</li></Link>
                                    </ul>
                                )}
                            </div>
                            <Link to='/about' className={`uppercase ${scrolled ? 'text-black':''} hover:text-[#2d9596]`} style={{fontFamily : "Montserrat, sans-serif"}}>About</Link>
                            <Link to='/contact' className={`uppercase ${scrolled ? 'text-black':''} hover:text-[#2d9596]`} style={{fontFamily : "Montserrat, sans-serif"}}>Contact</Link>
                        </ul>
                    </nav>
                </div>

                <div className="flex items-center gap-5 text-xs lg:text-sm ">
                <SearchButton />

                    {
                        user &&
                        <Link to='/wishlist' className="text-black hidden lg:block bg-white rounded-full p-2 border-0 outline-0 relative">
                            <GoHeart size={18} />
                            {wishlist.length > 0 && user && (
                            <div className="bg-red-500 w-3 h-3.5 absolute -top-1 right-0 text-[10px] text-center rounded-full text-white">
                                {wishlist.length}
                            </div>
                        )}
                        </Link>
                    }
                    
                    {/* Conditional rendering for login dropdown */}
                    {!user ? (
                        <Link to='/login' className="z-20">
                            <button className={`cursor-pointer hidden md:block px-4 bg-white  py-2 rounded-3xl hover:bg-[#2d9596] hover:text-white`}>
                                Login
                            </button>
                        </Link>
                    ) : (
                        <div className="relative hidden md:block">
                            {/* user btn */}
                            <button
                                className="flex items-center"
                                onClick={() => setShowDropdown(!showDropdown)}
                            >
                                <FaUserCircle size={30} className="text-black bg-amber-50 rounded-full border-0 outline-0" />
                            </button>

                            {/* Dropdown menu */}
                            {showDropdown && (
                                <ul className="absolute right-[-30px] top-[46px] w-30 bg-white" onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
                                    <li className="px-4 py-2 font-bold bg-gray-100">{user.name.toUpperCase()}</li>
                                    <Link to="/orderhistory">
                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Orders</li>
                                    </Link>
                                    <li className="px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>
                                        Logout
                                    </li>
                                </ul>
                            )}
                        </div>
                    )}

                    {/* Cart - prevent non-Logged users */}
                    <button
                        className="relative bg-white p-2 rounded-2xl"
                        onClick={() => {
                            if (!user) {
                                Swal.fire("LogIn","You need to log in to access the cart","warning");
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

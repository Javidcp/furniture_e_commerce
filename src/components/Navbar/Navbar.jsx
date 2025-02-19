import { useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import Responsive from "../Navbar/Responsive";
import { IoMdArrowDropup , IoMdArrowDropdown } from "react-icons/io";





const Navbar = () => {

    const [showMenu, setShowMenu] = useState(false)

    const toggle = () => {
        setShowMenu((prev) => {
            console.log("Menu toggled: ", !prev); // Log the toggle state
            return !prev;
        });
    };

    const [isOpen, setIsOpen] = useState(false);
    
    

    return (
        <div className="bg-white sm:px-4 fixed w-full z-50 shadow-sm top-0 shadow-gray-100"  style={{fontFamily : 'sans-serif'}}>
            <div className="max-w-7xl mx-auto py-3 px-5 sm:px-15.5 flex justify-between items-center">
                <div className='text-2xl font-extrabold'>HOME<span className="text-red-500">HAVEN</span></div>

                <div className="flex items-center gap-5 hidden lg:block">
                    <nav>
                        <ul className="flex items-center  text-xs lg:text-sm font-medium gap-7">
                            <Link to='/'><li>HOME</li></Link>
                            <div className="relative inline-block"  onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
                                <button onClick={() => setIsOpen(!isOpen)} className="cursor-pointer flex items-center justify-between gap-2 px-0 py-2">
                                    SHOP <span>{isOpen ? <IoMdArrowDropup  size={15} /> : <IoMdArrowDropdown size={15} />}</span>
                                </button>

                                {isOpen && (
                                    <ul className="absolute left-0 w-40 bg-white"  onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
                                    <Link to='/bed'><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b-1">Bed</li></Link>
                                    <Link to='/sofa'><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b-1">Sofa</li></Link>
                                    </ul>
                                )}
                                </div>
                            <Link to='/newarrivals'><li>NEW ARRIVALS</li></Link>
                            <Link to='/bestseller'><li>BEST SELLERS</li></Link>
                            <Link to='/offers'><li>OFFER & DISCOUNT</li></Link>
                        </ul>
                    </nav>
                </div>

                <div className="flex items-center gap-5 text-xs lg:text-sm">
                    <Link to='/login'><button className="cursor-pointer px-4 border border-red-500 py-2 rounded-3xl text-red-500 hover:bg-red-500 hover:text-white">Login</button></Link>

                    <Link to='/cart' className="relative bg-amber-50 p-2 rounded-2xl">
                            <IoCartOutline className="w-4.5 h-4.5" />
                            <div className="bg-red-500 w-3 h-3.5 absolute -top-1 right-0 text-xs text-center rounded-full text-white">0</div>
                        </Link>

                        {showMenu ? ( 
                            <HiMenuAlt1 onClick={toggle} className="cursor-pointer transition-all lg:hidden" size={30} /> 
                        ) : (
                            <HiMenuAlt3 onClick={toggle} className="cursor-pointer transition-all lg:hidden" size={30} />
                        )}
                </div>
            </div>
            <Responsive showMenu={showMenu} setShowMenu={setShowMenu} isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    )
}

export default Navbar
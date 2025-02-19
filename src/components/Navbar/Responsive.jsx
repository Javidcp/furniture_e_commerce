import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoMdArrowDropup , IoMdArrowDropdown } from "react-icons/io";


const Responsive = ({ showMenu, setShowMenu, isOpen, setIsOpen }) => {


    return (
        <div className={`fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white px-8 pb-6 pt-16 text-black lg:hidden rounded-r-xl shadow-md transition-all duration-300 ${
            showMenu ? "left-0" : "-left-full"}`}>
            <div>
                <div className="flex items-center justify-start gap-3 pb-2 border-b-1">
                    <FaUserCircle size={50} />
                    <div>
                        <h1>Hello User</h1>
                        <h1 className="text-sm text-slate-500">Premium User</h1>
                    </div>
                </div>
                <nav className="mt-12">
                    <ul className="flex flex-col space-y-4 text-xl ">
                        <li><Link to='/'>Home</Link></li>
                        <div className="relative inline-block"  onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
                            <button onClick={() => setIsOpen(!isOpen)} className="cursor-pointer flex items-center justify-between gap-2 px-0 py-2">
                                SHOP <span>{isOpen ? <IoMdArrowDropup  size={15} /> : <IoMdArrowDropdown size={15} />}</span>
                            </button>
                        
                            {isOpen && (
                                <ul className="absolute left-0 w-40 bg-white"  onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
                                <Link to='/actiontoys'><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b-1">Action Figures</li></Link>
                                <Link to='/educationaltoys'><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b-1">Educational Toys</li></Link>
                                <Link to='/softtoys'><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b-1">Soft Toys</li></Link>
                                <Link to='/puzzle'><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b-1">Puzzles & Games</li></Link>
                                <Link to='/outdoor'><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b-1">Outdoor Play</li></Link>
                                <Link to='/art-craft'><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b-1">Arts & Crafts</li></Link>
                                </ul>
                            )}
                        </div>
                        <Link to='/newarrivals'><li>NEW ARRIVALS</li></Link>
                        <Link to='/bestseller'><li>BEST SELLERS</li></Link>
                        <Link to='/offers'><li>OFFER & DISCOUNT</li></Link>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Responsive
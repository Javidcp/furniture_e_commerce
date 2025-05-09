import { Link, useLocation } from "react-router-dom";
import { FaUser, FaBoxOpen } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";




// eslint-disable-next-line react/prop-types
const Sidebar = ({ isOpen, toggleSidebar }) => {
    const location = useLocation();

    return (
        <div className={`fixed top-0 left-0 h-screen p-5 z-30 transition-transform transform shadow bg-[#1F1F1F] text-white ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <button className="text-2xl mb-2 block text-gray-400" onClick={toggleSidebar}>&times;</button>
            <div className='text-2xl font-extrabold text-white mb-10'>HOME<span className="text-[#2d9596]">HAVEN</span></div>
            <ul>
                <li className="mb-3">
                    <Link to="/dashboard" className={`flex gap-2 p-2 rounded ${location.pathname === "/dashboard" ? "bg-gray-200 pl-5 text-black" : "hover:text-gray-400"}`}>
                        <MdDashboard className="mt-1" />Dashboard
                    </Link>
                </li>
                <li className="mb-3">
                    <Link to="/dashboard/users" className={`gap-2 p-2 rounded flex  ${location.pathname.startsWith("/dashboard/users") ? "bg-gray-200 pl-5 text-black" : "hover:text-gray-400"}`}>
                        <FaUser className="mt-1" />Users
                    </Link>
                </li>
                <li className="mb-3">
                    <Link to="/dashboard/orders" className={`flex gap-2 p-2 rounded ${location.pathname.startsWith("/dashboard/orders") ? "bg-gray-200 pl-5 text-black" : "hover:text-gray-400"}`}>
                        <FaBoxOpen className="mt-1" />Orders
                    </Link>
                </li>
                <li className="mb-3">
                    <Link to="/dashboard/products" className={`flex gap-2 p-2 rounded ${location.pathname.startsWith("/dashboard/products") ? "bg-gray-200 pl-5 text-black" : "hover:text-gray-400"}`}>
                        <FaCartShopping className="mt-1" />Products
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;

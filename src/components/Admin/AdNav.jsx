import { Link, useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Sidebar = ({ isOpen, toggleSidebar }) => {
    const location = useLocation();

    return (
        <div className={`fixed top-0 left-0 h-screen p-5 z-10 transition-transform transform shadow bg-white ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <button className="text-2xl mb-2 block md:hidden" onClick={toggleSidebar}>&times;</button>
            <div className='text-2xl font-extrabold  mb-10'>HOME<span className="text-red-500">HAVEN</span></div>
            <ul>
                <li className="mb-3">
                    <Link to="/dashboard" className={`block p-2 rounded ${location.pathname === "/dashboard" ? "bg-gray-200 pl-5" : "hover:text-gray-700"}`} onClick={toggleSidebar}>
                        Dashboard
                    </Link>
                </li>
                <li className="mb-3">
                    <Link to="/dashboard/users" className={`block p-2 rounded ${location.pathname.startsWith("/dashboard/users") ? "bg-gray-200 pl-5" : "hover:text-gray-700"}`} onClick={toggleSidebar}>
                        Users
                    </Link>
                </li>
                <li className="mb-3">
                    <Link to="/dashboard/orders" className={`block p-2 rounded ${location.pathname.startsWith("/dashboard/orders") ? "bg-gray-200 pl-5" : "hover:text-gray-700"}`} onClick={toggleSidebar}>
                        Orders
                    </Link>
                </li>
                <li className="mb-3">
                    <Link to="/dashboard/products" className={`block p-2 rounded ${location.pathname.startsWith("/dashboard/products") ? "bg-gray-200 pl-5" : "hover:text-gray-700"}`} onClick={toggleSidebar}>
                        Products
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;

import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
    const location = useLocation(); // Get current path

    return (
        <div className="w-60 h-screen bg-gray-800 text-white p-5 fixed">
            <div className='text-2xl font-extrabold mt-5 mb-10'>HOME<span className="text-red-500">HAVEN</span></div>
            <ul>
                <li className="mb-3">
                    <Link 
                        to="/dashboard" 
                        className={`block p-2 rounded ${
                            location.pathname === "/dashboard" ? "bg-gray-700 pl-5" : "hover:text-gray-300"
                        }`}
                    >
                        Dashboard
                    </Link>
                </li>
                <li className="mb-3">
                    <Link 
                        to="/dashboard/users" 
                        className={`block p-2 rounded ${
                            location.pathname.startsWith("/dashboard/users") ? "bg-gray-700 pl-5" : "hover:text-gray-300"
                        }`}
                    >
                        Users
                    </Link>
                </li>
                <li className="mb-3">
                    <Link 
                        to="/dashboard/orders" 
                        className={`block p-2 rounded ${
                            location.pathname.startsWith("/dashboard/orders") ? "bg-gray-700 pl-5" : "hover:text-gray-300"
                        }`}
                    >
                        Orders
                    </Link>
                </li>
                <li className="mb-3">
                    <Link 
                        to="/dashboard/products" 
                        className={`block p-2 rounded ${
                            location.pathname.startsWith("/dashboard/products") ? "bg-gray-700 pl-5" : "hover:text-gray-300"
                        }`}
                    >
                        Products
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;

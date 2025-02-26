import { Outlet } from "react-router-dom";
import Sidebar from "./AdNav";

const AdminPanel = () => {
    

    return (
        <div className="flex bg-gray-900">
            {/* Sidebar */}
            <Sidebar />

            <div className=" p-6 flex-1  text-white">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminPanel;

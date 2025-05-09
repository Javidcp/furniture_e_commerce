import { Outlet } from "react-router-dom";
import Sidebar from "./AdNav";
import TopBar from "./TopBar";
import { useState } from "react";

const AdminPanel = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex bg-gray-100">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <TopBar toggleSidebar={toggleSidebar} />
            <div className={` ${isSidebarOpen === true ? "ml-60" : 'ml-0'} p-6 flex-1`}>
                <Outlet />
            </div>
        </div>
    );
};

export default AdminPanel;

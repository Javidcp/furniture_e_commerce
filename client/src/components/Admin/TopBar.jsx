import { useContext } from "react";
import { IoIosLogOut, IoIosMenu } from "react-icons/io";
import { AuthContext } from "../Authentication/AuthContext";
import { useNavigate } from "react-router-dom";


// eslint-disable-next-line react/prop-types
const TopBar = ({ toggleSidebar }) => {
    const authContext = useContext(AuthContext)
    const navigate = useNavigate()

    const { logout } = authContext

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div className="fixed p-3 shadow bg-white flex justify-between w-full z-20">
            <button className=" ml-4 text-2xl" onClick={toggleSidebar}><IoIosMenu /></button>
            <button className="  flex border pt-1 pb-2 px-3 rounded cursor-pointer hover:bg-red-600 hover:border-0 hover:text-white" onClick={handleLogout}>Logout &nbsp;<IoIosLogOut size={20} className="mt-1" /></button>
        </div>
    )
}

export default TopBar
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Authentication/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Users = () => {

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(() => {
            if (!user || user.role !== "admin") {
                alert("Access Denied: You are not an admin!");
                navigate("/");
                return;
            }
        const fetchData = async () => {
            try {
                const [usersRes] = await Promise.all([
                    axios.get("http://localhost:5659/users"),
                    
                ]);
                setUsers(usersRes.data);
                
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [user, navigate]);

    const recentUsers = [...users].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <div className="ml-60 flex-1">
            {/* Recent User Activity */}
            <h3 className="text-xl font-bold mt-6">Recent User Activity</h3>
            <table className="w-full mt-3">
                <thead>
                    <tr className="bg-gray-700">
                        <th className="p-2">User</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Registered</th>
                    </tr>
                </thead>
                <tbody>
                    {recentUsers.map((user, index) => (
                        <tr key={index} className="border-b border-gray-700 text-center hover:bg-white hover:text-black">
                            <td className="p-2">{user.name}</td>
                            <td className="p-2">{user.email}</td>
                            <td className="p-2">{new Date(user.createdAt).toLocaleDateString()}</td>
                            <Link to={`/dashboard/users/${user.id}`}><td className="cursor-pointer text-blue-500">View Details</td></Link>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Users
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Authentication/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";



const Users = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (!user || user.role !== "admin") {
            navigate("/");
            alert("Access Denied: You are not an admin!");
            return;
        }

        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5659/users");
                const usersData = response.data;

                // Calculate total order amount for each user
                const usersWithTotalAmount = usersData.map(user => {
                    const totalAmount = user.purchaseHistory
                        ? user.purchaseHistory.reduce((acc, order) => acc + order.totalAmount, 0)
                        : 0;

                    return { ...user, totalAmount };
                });

                setUsers(usersWithTotalAmount);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [user, navigate]);


    //Delete user
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await axios.delete(`http://localhost:5659/users/${id}`);
                setUsers(users.filter(user => user.id !== id));
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        }
    };


    const recentUsers = [...users].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <div className="flex-1 min-h-[83.5vh] mt-12">
            {/* Recent User Activity */}
            <h3 className="text-xl font-bold my-6 rounded bg-gray-200 p-2">Customer&apos;s List</h3>
            <table className="w-full mt-3">
                <thead>
                    <tr className="bg-gray-200 ">
                        <th className="p-2 text-left">Client</th>
                        <th className="p-2">Total</th>
                        <th className="p-2">Registered Date</th>
                        <th className="p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {recentUsers.map((user, index) => (
                        <tr key={index} className="border-b border-gray-300 hover:bg-gray-100">
                            <td className="p-2">
                                <span className="block text-sm">{user.name.toUpperCase()}</span>
                                <span className="block text-xs text-gray-400">{user.name === "admin" ? "" : user.email}</span>
                            </td>
                            <td className="p-2 text-center">{user.name === "admin" ? "" : "₹ "} {user.name === "admin" ? "-" : user.totalAmount.toLocaleString("en-IN")}</td>
                            <td className="p-2 text-center">{user.name === "admin" ? "-" : new Date(user.createdAt).toLocaleDateString()}</td>
                            <td className="p-2 text-center flex justify-center gap-2">
                            {user.name !== "admin" && (
                                    <>
                                        <Link to={`/dashboard/users/${user.id}`} className="text-blue-400 py-2 mx-1 cursor-pointer">
                                            <FaRegEye size={18} />
                                        </Link>
                                        <button onClick={() => handleDelete(user.id)} className=" text-red-600 mx-1 cursor-pointer">
                                            <MdDeleteOutline size={20} />
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;

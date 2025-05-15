import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Authentication/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";
import { MdBlock } from "react-icons/md";
import { CgUnblock } from "react-icons/cg";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from "../Authentication/api";




const Users = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    

    useEffect(() => {
        if (!user || user.role !== "admin") {
            navigate("/");
            toast.warning("You are not an admin");
            return;
        }
        

        const fetchData = async () => {
            try {
                const [usersRes, ordersRes] = await Promise.all([
                    api.get("/users"),
                    api.get(`/api/orders/allOrder`)
                ]);

                console.log(usersRes);
                console.log(ordersRes);
                

                const usersData = usersRes.data;
                const orders = ordersRes.data?.orders || [];

                const userWithTotal = usersData.map(u => {
                    const userOrders = orders.filter(order => {
                        const orderUserId = order.userId?._id?.toString() || order.userId?.toString();
                        return orderUserId === u._id.toString();
                    });
        
                    const totalAmount = userOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
        
                    return { ...u, totalAmount };
                });

                setUsers(userWithTotal);
            } catch (error) {
                console.error("Error fetching data:", error);
                
            }
        };
        fetchData();
    }, [user, navigate]);


    
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, keep it",
            reverseButtons: true
        });
    
        if (result.isConfirmed) {
            try {
                await api.delete(`/users/${id}`);
                setUsers((prev) => prev.filter((u) => u._id !== id));
                toast.success("User has been deleted.");
            } catch (error) {
                console.error("Delete error:", error);
                toast.error("Could not delete user.");
            }
        }
    };

    const toggleBlockUser = async (id, currentStatus) => {
        try {
            const response = await api.patch(`/users/${id}`, {
                blocked: !currentStatus,
            });

            setUsers((prev) =>
                prev.map((u) =>
                    u._id === id ? { ...u, blocked: response.data.blocked } : u
                )
            );
        } catch (error) {
            console.error("Block/Unblock error:", error);
        }
    };


    const recentUsers = [...users].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    return (
        <div className="flex-1 min-h-[83.5vh] mt-12">
            {/* Users */}
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
                    {recentUsers.map((user) => (
                        <tr key={user._id} className="border-b border-gray-300 hover:bg-gray-100">
                            <td className="p-2">
                                <span className="block text-sm">{user.name.toUpperCase()}</span>
                                <span className="block text-xs text-gray-400">{user.role === "admin" ? "" : user.email}</span>
                            </td>
                            <td className="p-2 text-center">{user.role === "admin" ? "" : "₹ "} {user.role === "admin" ? "-" : user.totalAmount.toLocaleString("en-IN")}</td>
                            <td className="p-2 text-center">{user.role === "admin" ? "-" : new Date(user.createdAt).toLocaleDateString()}</td>
                            <td className="p-2 text-center flex justify-center gap-2">
                            {user.role !== "admin" && (
                                <>
                                    <Link to={`/dashboard/users/${user._id}`} className="text-blue-400 py-2 mx-1 cursor-pointer">
                                        <FaRegEye size={18} />
                                    </Link>
                                    <button onClick={() => handleDelete(user._id)} className=" text-red-600 mx-1 cursor-pointer">
                                        <MdDeleteOutline size={20} />
                                    </button>
                                    <button onClick={() => toggleBlockUser(user._id, user.blocked)}>
                                        {user.blocked ?  <MdBlock className="text-red-600" /> : <CgUnblock className="text-green-600" />}
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

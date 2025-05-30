import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Authentication/AuthContext";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import api from "../Authentication/api";

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [orderss, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);

    useEffect(() => {
        if (!user || user.role !== "admin") {
            Swal.fire({
                title: "Access Denied!",
                text: "You are not an admin!",
                icon: "error",
                confirmButtonText: "OK"
            }).then(() => {
                navigate("/");
            });
            return;
        }

        const fetchData = async () => {
            try {
                const [usersRes, productsRes, orderRes] = await Promise.all([
                    api.get("/users"),
                    api.get("/products/all"),
                    api.get("/api/orders/allOrder"),
                ]);

                setUsers(usersRes.data);
                setProducts(productsRes.data);
                setOrders(orderRes.data.orders)
                
                const revenue = orderRes.data.orders.reduce((total, order) => {
                    return total + order.items.reduce((sum, item) => sum + (item.price * 0.25 * item.quantity), 0);
                }, 0);
                
                setTotalRevenue(revenue);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [user, navigate]);

    const recentUsers = [...users].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

    const recentOrders = [...orderss].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

    const pendingOrders = orderss.filter(order => order.orderStatus === "processing");
    const failedOrders = orderss.filter(order => order.orderStatus === "cancelled");

    const handleStatus = (orderStatus) => {
        switch (orderStatus) {
            case "processing" :
                return "text-yellow-400"
            case "shipped" :
                return "text-orange-500"
            case "delivered" :
                return "text-green-500"
            case "cancelled" :
                return "text-red-500"
            default :
                return orderStatus;
        }
    }

    return (
        <div className="flex-1 px-6 mt-12">
                <div className="p-3 mb-5 bg-white text-xl font-semibold rounded">E-commerce</div>

            {/* Dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                <div className="px-4 py-10 rounded" style={{background : "linear-gradient(to right, #80F841, #38D782)"}}>
                    <h3 className="text-lg font-semibold">Total Users</h3>
                    <p className="text-2xl">{users.length}</p>
                </div>
                <div className="px-4 py-10 rounded" style={{background : "linear-gradient(to right, #D92FDA, #E1A0FF)"}}>
                    <h3 className="text-lg font-semibold">Total Orders</h3>
                    <p className="text-2xl">{orderss.length}</p>
                </div>
                <div className="px-4 py-10 rounded"  style={{background : "linear-gradient(to right, #05B5F9, #462FFF)"}}>
                    <h3 className="text-lg font-semibold">Total Products</h3>
                    <p className="text-2xl">{products.length}</p>
                </div>
                <div className="px-4 py-10 rounded"  style={{background : "linear-gradient(to right, #F0F42D, #DEAF2C)"}}>
                    <h3 className="text-lg font-semibold">Total Revenue</h3>
                    <p className="text-2xl">₹{totalRevenue.toFixed(2)}</p>
                </div>
            </div>

            {/* 5 recent user registered */}
            <h3 className="text-xl font-bold mt-6">Recent Registered User</h3>
            <table className="w-full mt-3">
                <thead>
                    <tr className="bg-white">
                        <th className="p-2">User</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Registered</th>
                    </tr>
                </thead>
                <tbody>
                    { recentUsers.map((user, index) => (
                        <tr key={index} className="border-b border-gray-400 text-center">
                            <td className="p-2">
                                {user.name.toUpperCase()}
                            </td>
                            <td className="p-2">{user.email}</td>
                            <td className="p-2">{new Date(user.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* recent orders */}   
            <h3 className="text-xl font-bold mt-6">Recent Orders</h3>
            <table className="w-full  mt-3">
                <thead>
                    <tr className="bg-white">
                        <th className="p-2">Order ID</th>
                        <th className="p-2">Total</th>
                        <th className="p-2">Date</th>
                        <th className="p-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {recentOrders.map((order) => (
                        <tr key={order._id} className="border-b border-gray-400 text-center">
                            <td className="p-2">
                                {order._id}
                            </td>
                            <td className="p-2">₹{order.totalAmount.toLocaleString("en-IN")}</td>
                            <td className="p-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                            <td className={`p-2 font-semibold ${handleStatus(order.orderStatus)}`}>
                                {order.orderStatus}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Proccessing & failed orders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div>
                    <h3 className="text-xl font-bold text-yellow-600 my-2">Processing Orders</h3>
                    <ul className="bg-yellow-100 text-black  p-3 rounded">
                        {pendingOrders.length > 0 ? pendingOrders.map((order, index) => (
                            <li key={index} className="border-b border-gray-300 p-2 text-sm flex justify-between">
                                <span>Order  </span> - 
                                #{order._id} - 
                                <span>₹{order.totalAmount.toLocaleString("en-IN")}</span></li>
                        )) : <p className="p-2">No processing orders</p>}
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-red-600 my-2">Failed Transactions</h3>
                    <ul className="bg-red-100 text-black p-3 rounded">
                        {failedOrders.length > 0 ? failedOrders.map((order, index) => (
                            <li key={index} className="border-b border-gray-300 p-2 flex justify-between">
                                <span>Order</span> - 
                                #{order._id} - 
                                <span>₹{order.totalAmount.toLocaleString("en-IN")}</span></li>
                        )) : <p className="p-2">No failed transactions</p>}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

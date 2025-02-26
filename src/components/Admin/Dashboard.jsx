import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Authentication/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);

    useEffect(() => {
        if (!user || user.role !== "admin") {
            alert("Access Denied: You are not an admin!");
            navigate("/");
            return;
        }

        const fetchData = async () => {
            try {
                const [usersRes, productsRes] = await Promise.all([
                    axios.get("http://localhost:5659/users"),
                    axios.get("http://localhost:5050/products"),
                ]);

                setUsers(usersRes.data);
                setProducts(productsRes.data);

                const allOrders = usersRes.data.flatMap(user => user.purchaseHistory || []);
                setOrders(allOrders);

                // Calculate total revenue (30% of item price from each order)
                const revenue = allOrders.reduce((total, order) => {
                    return total + order.items.reduce((sum, item) => sum + (item.price * 0.3 * item.quantity), 0);
                }, 0);

                setTotalRevenue(revenue);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [user, navigate]);

    // Sort users by most recent registration/login
    const recentUsers = [...users].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 8);
    
    // Sort orders by most recent date
    const recentOrders = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
    
    // Filter pending/failed transactions
    const pendingOrders = orders.filter(order => order.status === "Processing");
    const failedOrders = orders.filter(order => order.status === "Failed");

    return (
        <div className="ml-64 flex-1 px-6    ">
                <div className="p-3 mb-5 bg-gray-700 rounded">Ecommerce</div>

            {/* Dashboard Summary */}
            <div className="grid grid-cols-2 gap-4 text-center">
                <div className="px-4 py-8 bg-green-500 rounded">
                    <h3 className="text-lg font-semibold">Total Users</h3>
                    <p className="text-2xl">{users.length}</p>
                </div>
                <div className="px-4 py-8 bg-purple-500 rounded">
                    <h3 className="text-lg font-semibold">Total Orders</h3>
                    <p className="text-2xl">{orders.length}</p>
                </div>
                <div className="px-4 py-8 bg-blue-500 rounded">
                    <h3 className="text-lg font-semibold">Total Products</h3>
                    <p className="text-2xl">{products.length}</p>
                </div>
                <div className="px-4 py-8 bg-orange-400 rounded">
                    <h3 className="text-lg font-semibold">Total Revenue</h3>
                    <p className="text-2xl">₹{totalRevenue.toFixed(2)}</p>
                </div>
            </div>

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
                        <tr key={index} className="border-b border-gray-700 text-center">
                            <td className="p-2">{user.name}</td>
                            <td className="p-2">{user.email}</td>
                            <td className="p-2">{new Date(user.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Recent Orders */}
            <h3 className="text-xl font-bold mt-6">Recent Orders</h3>
            <table className="w-full  mt-3">
                <thead>
                    <tr className="bg-gray-700">
                        <th className="p-2">Order ID</th>
                        <th className="p-2">User</th>
                        <th className="p-2">Total</th>
                        <th className="p-2">Date</th>
                        <th className="p-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {recentOrders.map((order, index) => (
                        <tr key={index} className="border-b border-gray-700 text-center">
                            <td className="p-2">{order.orderId}</td>
                            <td className="p-2">{order.name}</td>
                            <td className="p-2">₹{order.totalAmount}</td>
                            <td className="p-2">{new Date(order.date).toLocaleDateString()}</td>
                            <td className={`p-2 font-semibold ${order.status === "Processing" ? "text-yellow-600" : order.status === "Failed" ? "text-red-600" : "text-green-600"}`}>
                                {order.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pending & Failed Orders */}
            <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                    <h3 className="text-xl font-bold text-yellow-600 my-2">Pending Orders</h3>
                    <ul className="bg-yellow-100 text-black  p-3 rounded">
                        {pendingOrders.length > 0 ? pendingOrders.map((order, index) => (
                            <li key={index} className="border-b p-2 text-sm"><span className="uppercase">Order  </span>:   #{order.orderId} - ₹{order.totalAmount}</li>
                        )) : <p className="p-2">No pending orders</p>}
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-red-600 my-2">Failed Transactions</h3>
                    <ul className="bg-red-100 text-black p-3 rounded">
                        {failedOrders.length > 0 ? failedOrders.map((order, index) => (
                            <li key={index} className="border-b p-2">Order #{order.orderId} - ₹{order.totalAmount}</li>
                        )) : <p className="p-2">No failed transactions</p>}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

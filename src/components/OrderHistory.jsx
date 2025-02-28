import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/Authentication/AuthContext";
import axios from "axios";

const OrderHistory = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (!user) {
            alert("You need to log in to view order history.");
            navigate("/login");
            return;
        }

        // Fetch user order history from JSON server
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:5659/users/${user.id}`);
                const sortedOrders = (response.data.purchaseHistory || []).sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                );
                setOrders(sortedOrders);
            } catch (error) {
                console.error("Error fetching order history:", error);
            }
        };

        fetchOrders();
    }, [user, navigate]);

    return (
        <div className="max-w-4xl mx-auto p-6 mt-20 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Order History</h2>

            {orders.length === 0 ? (
                <p className="text-gray-500 text-center">No past orders found.</p>
            ) : (
                orders.map((order) => (
                    <div key={order.orderId} className="border p-4 rounded mb-4 bg-gray-50">
                        <p><strong>Order ID:</strong> {order.orderId}</p>
                        <p><strong>Order Date:</strong> {order.date}</p>
                        <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                        <p><strong>Status:</strong> {order.status}</p>
                        <p><strong>Total:</strong> ₹ {order.totalAmount.toLocaleString("en-IN")}</p>

                        <div className="mt-2">
                            <h4 className="text-md font-semibold">Items:</h4>
                            {order.items.map((item, index) => (
                                <p key={index} className="text-sm">
                                    {item.name} (x{item.quantity}) - ₹{item.price * item.quantity}
                                </p>
                            ))}
                        </div>
                    </div>
                ))
            )}

            <div className="w-full text-center mt-6">
                <button
                    onClick={() => navigate("/")}
                    className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
                >
                    Continue Shopping
                </button>
            </div>
        </div>
    );
};

export default OrderHistory;

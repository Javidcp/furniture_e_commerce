import { useContext, useEffect, useState } from "react";
import { CartContext } from "../components/cart/CartContext";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
    const { cart, setCart } = useContext(CartContext);
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);

    useEffect(() => {
    // Load past orders from local storage
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
    }, []);

    const handlePlaceOrder = () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Generate new order details
    const newOrder = {
        orderId: `ORD${Math.floor(Math.random() * 1000000)}`,
        date: new Date().toLocaleString(),
        items: cart,
        totalAmount:
        cart.reduce((acc, item) => acc + item.price * item.quantity, 0) +
        (cart.reduce((acc, item) => acc + item.price * item.quantity, 0) > 10000
            ? 0
            : 50),
        paymentMethod: "Cash on Delivery",
        status: "Processing",
    };

    // Save new order
    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    // Clear cart after placing the order
    setCart([]);
    alert("Order placed successfully!");
    };

return (
    <div className="max-w-4xl mx-auto p-6 mt-20 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Order History</h2>

        {/* Current Cart (Before Ordering) */}
        <div className="border p-4 rounded mb-6 bg-gray-100">
            <h3 className="text-lg font-semibold mb-2">Current Cart</h3>
            {cart.length === 0 ? (
            <p className="text-gray-500">No items in the cart.</p>
            ) : (
            <>
            {cart.map((item, index) => (
                <div key={index} className="flex justify-between border-b py-2">
                <span>
                    {item.name} (x{item.quantity})
                </span>
                <span>₹{item.price * item.quantity}</span>
                </div>
            ))}
            <button
                onClick={handlePlaceOrder}
                className="w-full bg-blue-500 text-white font-semibold py-2 px-4 mt-4 rounded hover:bg-blue-600 transition-all"
            >
                Place Order
            </button>
            </>
        )}
    </div>

        {/* Past Orders */}
        <h3 className="text-xl font-semibold mb-3">Past Orders</h3>
        {orders.length === 0 ? (
        <p className="text-gray-500">No past orders found.</p>
        ) : (
            orders.map((order, index) => (
            <div key={index} className="border p-4 rounded mb-4 bg-gray-50">
            <p>
                <strong>Order ID:</strong> {order.orderId}
            </p>
            <p>
                <strong>Order Date:</strong> {order.date}
            </p>
            <p>
                <strong>Payment Method:</strong> {order.paymentMethod}
            </p>
            <p>
                <strong>Status:</strong> {order.status}
            </p>
            <p className="font-bold">Total: ₹{order.totalAmount}</p>
            </div>
        ))
        )}

        {/* Back to Home Button */}
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

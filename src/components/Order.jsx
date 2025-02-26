// import { useContext, useEffect, useRef, useState } from "react";
// import { CartContext } from "../components/cart/CartContext";
// import { AuthContext } from "../components/Authentication/AuthContext"; // Import AuthContext
// import { useNavigate } from "react-router-dom";

// const Order = () => {
//     const { cart, setCart } = useContext(CartContext);
//     const { user } = useContext(AuthContext); // Get logged-in user
//     const navigate = useNavigate();
//     const hasPlacedOrder = useRef(false); // Prevent duplicate submissions

//     const [totalAmount, setTotalAmount] = useState(0);
//     const [orderId, setOrderId] = useState("");
//     const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

//     useEffect(() => {
//         if (!user) {
//             alert("You need to be logged in to place an order.");
//             navigate("/login");
//             return;
//         }

//         if (cart.length === 0 && !hasPlacedOrder.current) {
//             navigate("/");
//         }
//     }, [cart, navigate, user]);

//     useEffect(() => {
//         if (!user) return;

//         const userOrdersKey = `orders_${user.email}`; // Store orders per user

//         if (cart.length > 0 && !hasPlacedOrder.current) {
//             hasPlacedOrder.current = true; // Mark that order is placed

//             const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
//             const shippingFee = cartTotal > 10000 ? 0 : 250;
//             const calculatedTotal = cartTotal + shippingFee;
//             setTotalAmount(calculatedTotal);

//             // Generate unique Order ID
//             const newOrderId = `ORD${Date.now()}${Math.floor(Math.random() * 1000)}`;
//             setOrderId(newOrderId);

//             // Get selected payment method
//             const selectedPaymentMethod = localStorage.getItem("selectedPaymentMethod") || "Cash on Delivery";
//             setPaymentMethod(selectedPaymentMethod);

//             // Create new order object
//             const order = {
//                 orderId: newOrderId,
//                 email: user.email,
//                 date: new Date().toLocaleDateString(),
//                 paymentMethod: selectedPaymentMethod,
//                 status: "Processing",
//                 items: cart,
//                 totalAmount: calculatedTotal,
//             };

//             // Retrieve past orders of this user
//             const pastOrders = JSON.parse(localStorage.getItem(userOrdersKey)) || [];

//             // Store order only if it's new
//             if (!pastOrders.some((o) => o.orderId === newOrderId)) {
//                 localStorage.setItem(userOrdersKey, JSON.stringify([order, ...pastOrders]));
//                 localStorage.setItem(`lastOrderTotal_${user.email}`, calculatedTotal);
//                 localStorage.setItem(`lastOrderId_${user.email}`, newOrderId);
//             }

//             setCart([]); // Clear cart after order
//         } else {
//             // Restore previous order details if user refreshes
//             setTotalAmount(parseFloat(localStorage.getItem(`lastOrderTotal_${user.email}`)) || 0);
//             setOrderId(localStorage.getItem(`lastOrderId_${user.email}`) || "");
//             setPaymentMethod(localStorage.getItem("selectedPaymentMethod") || "Cash on Delivery");
//         }
//     }, [user]);

//     return (
//         <div className="max-w-3xl mx-auto p-6 mt-20 bg-white shadow-lg rounded-lg">
//             <h2 className="text-2xl font-bold mb-4 text-center">Order Placed Successfully!</h2>

//             <div className="border p-4 rounded mb-6 bg-gray-100">
//                 <p><strong>Order ID:</strong> {orderId}</p>
//                 <p><strong>Order Date:</strong> {new Date().toLocaleDateString()}</p>
//                 <p><strong>Payment Method:</strong> {paymentMethod}</p>
//                 <p><strong>Status:</strong> Processing</p>
//             </div>

//             <div className="border p-4 rounded bg-gray-50">
//                 <p className="text-lg font-bold">Total: ₹{totalAmount}</p>
//             </div>

//             <div className="w-full text-center mt-6">
//                 <button
//                     onClick={() => navigate("/orderhistory")}
//                     className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
//                 >
//                     View Order History
//                 </button>
//                 <button
//                     onClick={() => navigate("/")}
//                     className="bg-blue-500 text-white px-6 py-2 rounded ml-4 hover:bg-blue-600"
//                 >
//                     Continue Shopping
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Order;

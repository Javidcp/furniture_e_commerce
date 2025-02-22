import { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "../components/cart/CartContext";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();
  const hasPlacedOrder = useRef(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [orderId, setOrderId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery"); // Default

  useEffect(() => {
    if (cart.length === 0 && !hasPlacedOrder.current) {
      navigate("/");
    }
  }, [cart, navigate]);

  useEffect(() => {
    if (cart.length > 0 && !hasPlacedOrder.current) {
      hasPlacedOrder.current = true; // Mark that an order is being placed

      const calculatedTotal =
        cart.reduce((acc, item) => acc + item.price * item.quantity, 0) +
        (cart.reduce((acc, item) => acc + item.price * item.quantity, 0) > 10000 ? 0 : 50);

      setTotalAmount(calculatedTotal);

      // Generate a unique order ID
      const newOrderId = `ORD${Date.now()}${Math.floor(Math.random() * 1000)}`;
      setOrderId(newOrderId);

      // Get selected payment method from localStorage
      const selectedPaymentMethod = localStorage.getItem("selectedPaymentMethod") || "Cash on Delivery";
      setPaymentMethod(selectedPaymentMethod);

      const order = {
        orderId: newOrderId,
        date: new Date().toLocaleDateString(),
        paymentMethod: selectedPaymentMethod, // Use the selected payment method
        status: "Processing",
        items: cart,
        totalAmount: calculatedTotal,
      };

      const pastOrders = JSON.parse(localStorage.getItem("orders")) || [];

      // Store order in localStorage if it's new
      if (!pastOrders.some((o) => o.orderId === newOrderId)) {
        localStorage.setItem("orders", JSON.stringify([order, ...pastOrders]));
        localStorage.setItem("lastOrderTotal", calculatedTotal);
        localStorage.setItem("lastOrderId", newOrderId);
      }

      setCart([]); // Clear cart after order is stored
    } else {
      setTotalAmount(parseFloat(localStorage.getItem("lastOrderTotal")) || 0);
      setOrderId(localStorage.getItem("lastOrderId") || "");
      setPaymentMethod(localStorage.getItem("selectedPaymentMethod") || "Cash on Delivery"); // Restore payment method
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 mt-20 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Order Placed Successfully!</h2>

      <div className="border p-4 rounded mb-6 bg-gray-100">
        <p><strong>Order ID:</strong> {orderId}</p>
        <p><strong>Order Date:</strong> {new Date().toLocaleDateString()}</p>
        <p><strong>Payment Method:</strong> {paymentMethod}</p> {/* Display selected payment method */}
        <p><strong>Status:</strong> Processing</p>
      </div>

      <div className="border p-4 rounded bg-gray-50">
        <p className="text-lg font-bold">Total: ₹{totalAmount}</p>
      </div>

      <div className="w-full text-center mt-6">
        <button
          onClick={() => navigate("/orderhistory")}
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
        >
          View Order History
        </button>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 text-white px-6 py-2 rounded ml-4 hover:bg-blue-600"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default Order;

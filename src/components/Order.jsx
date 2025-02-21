import { useContext } from "react";
import { CartContext } from "../components/cart/CartContext";
import { useNavigate } from "react-router-dom";

const OrderDetails = () => {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  // Sample order details (In real case, fetch from backend)
  const order = {
    orderId: `ORD${Math.floor(Math.random() * 1000000)}`,
    date: new Date().toLocaleDateString(),
    paymentMethod: "Cash on Delivery",
    status: "Processing",
  };

  const subTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const DELIVERY_FEE = subTotal > 10000 ? 0 : 50;
  const totalAmount = subTotal + DELIVERY_FEE;

  return (
    <div className="max-w-3xl mx-auto p-6 mt-20 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Order Details</h2>

      {/* Order Info */}
      <div className="border p-4 rounded mb-6 bg-gray-100">
        <p><strong>Order ID:</strong> {order.orderId}</p>
        <p><strong>Order Date:</strong> {order.date}</p>
        <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
        <p><strong>Status:</strong> {order.status}</p>
      </div>

      {/* Cart Items */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Items Ordered</h3>
        {cart.length === 0 ? (
          <p className="text-gray-500">No items in the order.</p>
        ) : (
          cart.map((item, index) => (
            <div key={index} className="flex justify-between border-b py-2">
              <span>{item.name} (x{item.quantity})</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))
        )}
      </div>

      {/* Price Summary */}
      <div className="border p-4 rounded bg-gray-50">
        <p className="text-sm py-2 border-b">Subtotal <span className="float-right">₹{subTotal}</span></p>
        <p className="text-sm py-2 border-b">Delivery Fee <span className="float-right">₹{DELIVERY_FEE}</span></p>
        <p className="text-lg font-bold pt-2">Total <span className="float-right">₹{totalAmount}</span></p>
      </div>

      {/* Back to Home Button */}
      <div className="w-full text-center mt-6">
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;

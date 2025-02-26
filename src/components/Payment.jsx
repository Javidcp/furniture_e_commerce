import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../components/cart/CartContext";
import { AuthContext } from "../components/Authentication/AuthContext";   
import axios from "axios";

const Payment = () => {
    const { cart, setCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // Form state
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: user?.email || "", // Prefill email if user is logged in
        street: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
        mobile: "",
    });

    // Payment method state
    const [method, setMethod] = useState("Cash on Delivery");

    // Calculate totals
    const subTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const DELIVERY_FEE = subTotal > 10000 ? 0 : 250;
    const totalAmount = subTotal + DELIVERY_FEE;

    // Handle input change
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Validate form and place order
    const handlePlaceOrder = async () => {
        console.log("Place Order button clicked"); // Debugging

        if (!user) {
            alert("You need to be logged in to place an order.");
            navigate("/login");
            return;
        }

        if (cart.length === 0) {
            alert("Your cart is empty.");
            navigate("/");
            return;
        }

        const { firstname, lastname, email, street, city, state, pincode, country, mobile } = formData;

        if (!firstname || !lastname || !email || !street || !city || !state || !pincode || !country || !mobile) {
            alert("Please fill in all required fields.");
            return;
        }

        console.log("All validations passed. Placing order..."); // Debugging

        // Create order object
        const newOrder = {
            orderId: `ORD${Date.now()}${Math.floor(Math.random() * 1000)}`,
            date: new Date().toLocaleDateString(),
            name: user.name,
            email: user.email,
            paymentMethod: method,
            status: "Processing",
            items: cart,
            totalAmount: totalAmount,
        };

        try {
            // Fetch existing user data from JSON server
            const response = await axios.get(`http://localhost:5659/users/${user.id}`);
            const existingUser = response.data;

            // Append new order to purchase history
            const updatedUser = {
                ...existingUser,
                purchaseHistory: [...(existingUser.purchaseHistory || []), newOrder],
                cart: [] // Clear cart after order placement
            };

            // Update user data on the server
            await axios.put(`http://localhost:5659/users/${user.id}`, updatedUser);

            console.log("Order saved to server:", newOrder); // Debugging

            // Clear cart in the frontend
            setCart([]);
            localStorage.removeItem(`cart_${user.email}`);

            alert("Order placed successfully!");
            navigate("/orderhistory");
        } catch (error) {
            console.error("Error saving order:", error);
        }
    };

    

    return (
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t my-8 md:my-20 mx-5 md:mx-20">
            {/* Left side - Delivery information */}
            <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
                <h2 className="text-xl sm:text-2xl my-3 uppercase font-normal text-gray-400">
                    Delivery <span className="text-black">Information</span>
                    <hr className="border-2 w-[40%] mt-1 border-red-500 rounded-2xl" />
                </h2>

                <div className="flex gap-3">
                    <input type="text" name="firstname" placeholder="First Name" value={formData.firstname} onChange={handleInputChange} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
                    <input type="text" name="lastname" placeholder="Last Name" value={formData.lastname} onChange={handleInputChange} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
                </div>

                <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" disabled />
                <input type="text" name="street" placeholder="Street" value={formData.street} onChange={handleInputChange} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />

                <div className="flex gap-3">
                    <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleInputChange} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
                    <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleInputChange} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
                </div>

                <div className="flex gap-3">
                    <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleInputChange} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
                    <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleInputChange} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
                </div>

                <input type="number" name="mobile" placeholder="Mobile No." value={formData.mobile} onChange={handleInputChange} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
            </div>

            {/* Right side - Payment */}
            <div className="mt-0">
                <div className="mt-8 min-w-80">
                    <h2 className="uppercase font-normal text-gray-400 mb-3">
                        Cart <span className="text-black">Totals</span>
                        <hr className="border-2 w-[40%] mt-1 border-red-500 rounded-2xl" />
                    </h2>
                    <p className="text-xs py-2 border-b border-gray-300">Subtotal <span className="float-end">₹ {subTotal}</span></p>
                    <p className="text-xs py-2 border-b border-gray-300">Delivery Fee <span className="float-end">₹ {DELIVERY_FEE}</span></p>
                    <p className="text-xs pt-2 font-bold">Total <span className="float-end">₹ {totalAmount}</span></p>
                </div>

                <div className="mt-9">
                    <h2 className="uppercase font-normal text-gray-400 mb-3">
                        Payment <span className="text-black">Method</span>
                        <hr className="border-2 w-[50%] mt-1 border-red-500 rounded-2xl" />
                    </h2>

                    {/* Payment options */}
                    {["Stripe", "Razorpay", "Cash on Delivery"].map((payment) => (
                        <div key={payment} onClick={() => setMethod(payment)} className="flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer">
                            <p className={`min-w-3 h-3 border border-gray-300 rounded-full ${method === payment ? "bg-green-400" : ""}`}></p>
                            <p className="text-gray-500 text-sm font-medium uppercase mx-4">{payment}</p>
                        </div>
                    ))}

                    <div className="w-full text-end mt-8">
                        <button onClick={handlePlaceOrder} className="bg-black text-white px-16 py-3 text-sm cursor-pointer">Place Order</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;

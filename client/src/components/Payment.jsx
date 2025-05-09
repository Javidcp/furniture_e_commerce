
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../components/cart/CartContext";
import { AuthContext } from "../components/Authentication/AuthContext";   
import axios from "axios";
import Swal from "sweetalert2";
import { loadStripe } from "@stripe/stripe-js";


const Payment = () => {
    const { cart, setCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [method, setMethod] = useState();
    const [isProcessing, setIsProcessing] = useState(false);
    const token = localStorage.getItem("token");
    

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: user?.email || "",
        street: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
        mobile: "",
    });

    const subTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const DELIVERY_FEE = subTotal > 10000 ? 0 : 250;
    const totalAmount = subTotal + DELIVERY_FEE;

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const requiredFields = ['firstname', 'lastname', 'street', 'city', 'state', 'pincode', 'country', 'mobile'];
        const isFormValid = requiredFields.every(field => formData[field] && formData[field].trim() !== '');
        
        if (!isFormValid) {
            Swal.fire("Error", "Please fill all required fields", "error");
            return false;
        }
        
        if (!method) {
            Swal.fire("Error", "Please select a payment method", "error");
            return false;
        }
        
        if (cart.length === 0) {
            Swal.fire("Error", "Your cart is empty", "error");
            return false;
        }
        
        return true;
    };

    const createOrderRecord = async () => {
        try {
            const orderData = {
                userId: user._id,
                items: cart.map(item => ({
                    productId: item._id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                })),
                totalAmount,
                shippingAddress: {
                    address: formData.street,
                    city: formData.city,
                    postalCode: formData.pincode,
                    country: formData.country,
                },
                paymentMethod: method,
                paymentStatus: null
            };

            const response = await axios.post(
                `http://localhost:5655/api/orders`, 
                orderData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );
            console.log("ordersss:",response.data.order)
            return response.data.order;
        } catch (error) {
            console.error("Order creation failed:", error.response?.data || error.message);
            throw error;
        }
    };



    useEffect(() => {
        if (!token) {
            console.error("Token is missing. User might not be logged in.");
            Swal.fire("Error", "Authentication token missing. Please log in again.", "error");
            return;
        }
        
    }, [])

    const handlePayment = async () => {
        if (!validateForm()) return;

        setIsProcessing(true);

        try {
            const order = await createOrderRecord();

            if (method === "Stripe") {
                const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
                const response = await axios.post(
                    `http://localhost:5655/api/payment/create-checkout-session`,
                    { 
                        products: cart, 
                        orderId: order._id,
                        customerEmail: user.email 
                    },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                const result = await stripe.redirectToCheckout({
                    sessionId: response.data.id
                });

                if (result.error) {
                    throw result.error;
                }
                
            } else {
                setCart([]);
                localStorage.removeItem(`cart_${user.email}`);
                navigate(`/success/${order._id}`);
                Swal.fire("Success", "Order placed successfully!", "success");
            }
        } catch (error) {
            console.error("Payment error:", error);
            Swal.fire(
                "Error", 
                error.response?.data?.message || 
                error.message || 
                "Payment processing failed", 
                "error"
            );
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t my-8 md:my-20 mx-5 md:mx-20">
            {/* Left side - Delivery Information */}
            <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
                <h2 className="text-xl sm:text-2xl my-3 uppercase font-normal text-gray-400 w-fit">Delivery <span className="text-black">Information</span></h2>
                <div className="flex gap-3">
                    <InputField name="firstname" placeholder="First Name" value={formData.firstname} onChange={handleInputChange} required />
                    <InputField name="lastname" placeholder="Last Name" value={formData.lastname} onChange={handleInputChange} required />
                </div>
                <InputField name="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} disabled />
                <InputField name="street" placeholder="Street" value={formData.street} onChange={handleInputChange} required />
                <div className="flex gap-3">
                    <InputField name="city" placeholder="City" value={formData.city} onChange={handleInputChange} required />
                    <InputField name="state" placeholder="State" value={formData.state} onChange={handleInputChange} required />
                </div>
                <div className="flex gap-3">
                    <InputField name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleInputChange} required />
                    <InputField name="country" placeholder="Country" value={formData.country} onChange={handleInputChange} required />
                </div>
                <InputField name="mobile" placeholder="Mobile No." value={formData.mobile} onChange={handleInputChange} type="tel" required />
            </div>

            {/* Right side - Payment */}
            <div className="mt-0">
                <CartTotals subTotal={subTotal} deliveryFee={DELIVERY_FEE} totalAmount={totalAmount} />
                <PaymentMethodOptions method={method} setMethod={setMethod} />
                <div className="w-full text-end mt-8">
                    <button 
                        onClick={handlePayment} 
                        disabled={isProcessing}
                        className={`bg-black text-white px-16 py-3 text-sm cursor-pointer ${isProcessing ? 'opacity-50' : 'hover:bg-gray-800'}`}
                    >
                        {isProcessing ? 'Processing...' : 'Place Order'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const InputField = ({ name, placeholder, value, onChange, disabled, type = "text", required = false }) => (
    <input 
        type={type} 
        name={name} 
        placeholder={placeholder} 
        value={value} 
        onChange={onChange} 
        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        disabled={disabled}
        required={required}
    />
);

const CartTotals = ({ subTotal, deliveryFee, totalAmount }) => (
    <div className="mt-8 min-w-80">
        <h2 className="uppercase font-normal text-gray-400 mb-3 w-fit">Cart <span className="text-black">Totals</span></h2>
        <p className="text-xs py-2 border-b border-gray-300">Subtotal <span className="float-end">₹ {subTotal}</span></p>
        <p className="text-xs py-2 border-b border-gray-300">Delivery Fee <span className="float-end">₹ {deliveryFee}</span></p>
        <p className="text-xs pt-2 font-bold">Total <span className="float-end">₹ {totalAmount}</span></p>
    </div>
);

const PaymentMethodOptions = ({ method, setMethod }) => (
    <div className="mt-3">
        <h2 className="uppercase font-normal text-gray-400 mb-3 w-fit">Payment <span className="text-black">Method</span></h2>
        {["Cash on Delivery", "Stripe"].map((payment) => (
            <div 
                key={payment} 
                onClick={() => setMethod(payment)} 
                className={`flex items-center gap-3 border rounded p-2 px-3 cursor-pointer mb-2 ${method === payment ? "border-black bg-gray-50" : "border-gray-300"}`}
            >
                <div className={`min-w-3 h-3 border rounded-full ${method === payment ? "bg-green-400 border-green-400" : "border-gray-300"}`}></div>
                <p className="text-gray-500 text-sm font-medium uppercase mx-4">{payment}</p>
            </div>
        ))}
    </div>
);

export default Payment;
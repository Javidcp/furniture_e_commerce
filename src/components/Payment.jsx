import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../components/cart/CartContext";
import { AuthContext } from "../components/Authentication/AuthContext";   
import axios from "axios";
import Swal from "sweetalert2";
import { loadStripe } from "@stripe/stripe-js"





const Payment = () => {
    const { cart, setCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [ method, setMethod ] = useState()

    // Form state
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: user?.email || "", // Prefill email
        street: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
        mobile: "",
    });


    // Calculate totals
    const subTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const DELIVERY_FEE = subTotal > 10000 ? 0 : 250;
    const totalAmount = subTotal + DELIVERY_FEE;

    // Handle input changes
    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    // Validate form before placing order
    const handlePlaceOrder = async () => {
        if (!user) {
            Swal.fire({ title: "Invalid", text: "You need to be logged in to place an order.", icon: "warning" });
            navigate("/login");
            return;
        }
    
        if (cart.length === 0) {
            Swal.fire({ title: "Invalid", text: "Your cart is empty", icon: "warning" });
            navigate("/");
            return;
        }
    
        const { firstname, lastname, email, street, city, state, pincode, country, mobile } = formData;
    
        if (!firstname || !lastname || !email || !street || !city || !state || !pincode || !country || !mobile || !method) {
            Swal.fire({ title: "Require", text: "Please fill in all required fields.", icon: "warning" });
            return;
        }
    
        const orderPayload = {
            userId: user._id,
            items: cart.map(item => ({
                productId: item.productId,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
            })),
            totalAmount,
            shippingAddress: {
                address: street, 
                city: city,
                postalCode: pincode,
                country: country,
            },
            paymentStatus: method === "Cash on Delivery" ? "pending" : "paid",
            orderStatus: "processing",
        };
    
        try {
            const response = await axios.post("http://localhost:5655/api/orders", orderPayload, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    "Content-Type": "application/json"
                }
            });
    
            // Clear cart after successful order placement (Cash on Delivery)
            setCart([]);
            localStorage.removeItem(`cart_${user.email}`);
    
            Swal.fire({ title: "Success", text: "Order placed successfully!", icon: "success" });
            navigate("/orderhistory");
        } catch (error) {
            console.error("Error placing order:", error);
            Swal.fire({ title: "Error", text: "Failed to place order. Please try again.", icon: "error" });
        }
    };
    
    


    const makePayment = async () => {
        const stripe = await loadStripe("pk_test_51RJXzZAWND4Xw4ec61PiabFDvFdoGavPG2TdTGrc4MbL48Y14oXCJ9WiBpTDsvkrrFdWv8i3454xOtnBgxdJc06L003wD7A0Mt");
        
        try {
            const response = await axios.post(`http://localhost:5655/api/payment/create-checkout-session`, {
                products: cart
            });
    
            const result = await stripe.redirectToCheckout({
                sessionId: response.data.id
            });
    
            if (result.error) {
                console.error(result.error.message);
            } else {
                // Check payment status after the redirect
                const session = await stripe.checkout.sessions.retrieve(response.data.id);
                if (session.payment_status === 'paid') {
                    const orderData = {
                        userId: user._id, 
                        products: cart,
                        totalAmount: totalAmount,
                        paymentStatus: 'completed',
                    };
    
                    await axios.post('http://localhost:5655/api/orders', orderData);
                    setCart([]);  // Clear the cart after successful order
                    Swal.fire({ title: "Success", text: "Order placed successfully!", icon: "success" });
                    navigate("/orderhistory");
                } else {
                    Swal.fire({ title: "Error", text: "Payment failed. Please try again.", icon: "error" });
                }
            }
    
        } catch (error) {
            console.error("Stripe checkout error:", error);
            Swal.fire({ title: "Error", text: "An error occurred during the payment process. Please try again.", icon: "error" });
        }
    };
    
    

    return (
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t my-8 md:my-20 mx-5 md:mx-20">
            {/* Left side - Delivery Information */}
            <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
                <h2 className="text-xl sm:text-2xl my-3 uppercase font-normal text-gray-400 w-fit">Delivery <span className="text-black">Information</span></h2>
                <div className="flex gap-3">
                    <InputField name="firstname" placeholder="First Name" value={formData.firstname} onChange={handleInputChange} />
                    <InputField name="lastname" placeholder="Last Name" value={formData.lastname} onChange={handleInputChange} />
                </div>
                <InputField name="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} disabled />
                <InputField name="street" placeholder="Street" value={formData.street} onChange={handleInputChange} />
                <div className="flex gap-3">
                    <InputField name="city" placeholder="City" value={formData.city} onChange={handleInputChange} />
                    <InputField name="state" placeholder="State" value={formData.state} onChange={handleInputChange} />
                </div>
                <div className="flex gap-3">
                    <InputField name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleInputChange} />
                    <InputField name="country" placeholder="Country" value={formData.country} onChange={handleInputChange} />
                </div>
                <InputField name="mobile" placeholder="Mobile No." value={formData.mobile} onChange={handleInputChange} type="number" />
            </div>

            {/* Right side - Payment */}
            <div className="mt-0">
                <CartTotals subTotal={subTotal} deliveryFee={DELIVERY_FEE} totalAmount={totalAmount} />
                <PaymentMethodOptions method={method} setMethod={setMethod} />
                <div className="w-full text-end mt-8">
                    <button onClick={method ==="Stripe" ? makePayment : handlePlaceOrder} className="bg-black text-white px-16 py-3 text-sm cursor-pointer">Place Order</button>
                </div>
            </div>
        </div>
    );
};

const InputField = ({ name, placeholder, value, onChange, disabled, type = "text" }) => (
    <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" disabled={disabled} />
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
            <div key={payment} onClick={() => setMethod(payment)} className="flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer">
                <p className={`min-w-3 h-3 border border-gray-300 rounded-full ${method === payment ? "bg-green-400" : ""}`}></p>
                <p className="text-gray-500 text-sm font-medium uppercase mx-4">{payment}</p>
            </div>
        ))}
    </div>
);

export default Payment;
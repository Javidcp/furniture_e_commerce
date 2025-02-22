import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../components/cart/CartContext";   
import strip from '../assets/Stripe-Logo.png';
import razorpay from '../assets/razorpay-logo.png';

const Payment = () => {
    const { cart } = useContext(CartContext);
    const navigate = useNavigate();

    // Form State
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
        mobile: "",
    });

    // Payment Method State
    const [method, setMethod] = useState('cod');

    // Calculate totals
    const subTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const DELIVERY_FEE = subTotal > 10000 ? 0 : 50;
    const totalAmount = subTotal + DELIVERY_FEE;

    // Handle input change
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Validate form before placing order
    const handlePlaceOrder = () => {
        const { firstname, lastname, email, street, city, state, pincode, country, mobile } = formData;
        
        if (!firstname || !lastname || !email || !street || !city || !state || !pincode || !country || !mobile) {
            alert("Please fill in all required fields.");
            return;
        }
    
        localStorage.setItem("selectedPaymentMethod", method);
        
        // Redirect to Order History
        navigate('/order');
    };
    

    return (
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t my-8 md:my-20 mx-5 md:mx-20">
            {/* Left Side - Delivery Information */}
            <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
                <h2 className="text-xl sm:text-2xl my-3 uppercase font-normal text-gray-400">Delivery <span className="text-black">Information</span>
                    <hr className="border-2 w-[40%] mt-1 border-red-500 rounded-2xl" />
                </h2>

                <div className="flex gap-3">
                    <input type="text" name="firstname" placeholder="First Name" value={formData.firstname} onChange={handleInputChange} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
                    <input type="text" name="lastname" placeholder="Last Name" value={formData.lastname} onChange={handleInputChange} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
                </div>

                <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
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

            {/* Right Side - Payment */}
            <div className="mt-9">
                <div className="mt-8 min-w-80">
                    <h2 className="uppercase font-normal text-gray-400 mb-3">Cart <span className="text-black">Totals</span>
                        <hr className="border-2 w-[40%] mt-1 border-red-500 rounded-2xl" />
                    </h2>
                    <p className="text-xs py-2 border-b border-gray-300">Subtotal <span className="float-end">₹ {subTotal}</span></p>
                    <p className="text-xs py-2 border-b border-gray-300">Delivery Fee <span className="float-end">₹ {DELIVERY_FEE}</span></p>
                    <p className="text-xs pt-2 font-bold">Total <span className="float-end">₹ {totalAmount}</span></p>
                </div>

                <div className="mt-9">
                    <h2 className="uppercase font-normal text-gray-400 mb-3">Payment <span className="text-black">Method</span>
                        <hr className="border-2 w-[50%] mt-1 border-red-500 rounded-2xl" />
                    </h2>

                    <div className="flex gap-3 flex-col lg:flex-row">
                        <div onClick={() => setMethod('strip')} className="flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer">
                            <p className={`min-w-3 h-3 border border-gray-300 rounded-full ${method === 'strip' ? 'bg-green-400' : ''}`}></p>
                            <img className="h-5 mx-4" src={strip} alt="Stripe" />
                        </div>

                        <div onClick={() => setMethod('razorpay')} className="flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer">
                            <p className={`min-w-3 h-3 border border-gray-300 rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
                            <img className="h-5 mx-4" src={razorpay} alt="Razorpay" />
                        </div>

                        <div onClick={() => setMethod('cod')} className="flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer">
                            <p className={`min-w-3 h-3 border border-gray-300 rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                            <p className="text-gray-500 text-sm font-medium uppercase mx-4">Cash on Delivery</p>
                        </div>
                    </div>

                    <div className="w-full text-end mt-8">
                        <button onClick={handlePlaceOrder} className="bg-black text-white px-16 py-3 text-sm">Place Order</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;

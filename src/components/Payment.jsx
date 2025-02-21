// import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
import { CartContext } from "../components/cart/CartContext";
// import Qr from '../assets/qr.jpg'

// const Payment = () => {
//     const { cart, setCart } = useContext(CartContext);
//     const navigate = useNavigate();
//     const [upiId, setUpiId] = useState(""); // Add state for UPI ID

    
//     const [paymentMethod, setPaymentMethod] = useState("credit-card");
//     const [address, setAddress] = useState({
//         fullName: "",
//         phone: "",
//         street: "",
//         city: "",
//         state: "",
//         pinCode: "",
//     });

//     const [cardDetails, setCardDetails] = useState({
//         name: "",
//         cardNumber: "",
//         expiry: "",
//         cvv: "",
//     });

    // const subTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    // const DELIVERY_FEE = subTotal > 10000 ? 0 : 50;
    // const totalAmount = subTotal + DELIVERY_FEE;

//     // Handle input changes
//     const handleAddressChange = (e) => {
//         setAddress(prev => ({ ...prev, [e.target.name]: e.target.value }));
//     };

//     const handleCardChange = (e) => {
//         setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
//     };

//     // Simulate payment submission
//     const handlePayment = (e) => {
//         e.preventDefault();

//         if (Object.values(address).some((field) => field.trim() === "")) {
//             alert("Please fill in all address details.");
//             return;
//         }

//         alert("Payment successful! Your order has been placed.");

//         setCart([]);
//         navigate("/order-success");
//     };

//     return (
//         <div className="max-w-lg mx-auto p-6 mt-20 bg-white shadow-lg rounded-lg">
//             <h2 className="text-2xl font-bold mb-4 text-center">Checkout</h2>

//             {/* Address Form */}
//             <div className="mb-6">
//                 <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
//                 <input type="text" name="fullName" placeholder="Full Name" value={address.fullName} onChange={handleAddressChange} className="w-full border p-2 rounded mb-2" required />
//                 <input type="text" name="phone" placeholder="Phone Number" value={address.phone} onChange={handleAddressChange} className="w-full border p-2 rounded mb-2" required />
//                 <input type="text" name="street" placeholder="Street Address" value={address.street} onChange={handleAddressChange} className="w-full border p-2 rounded mb-2" required />
//                 <input type="text" name="city" placeholder="City" value={address.city} onChange={handleAddressChange} className="w-full border p-2 rounded mb-2" required />
//                 <input type="text" name="state" placeholder="State" value={address.state} onChange={handleAddressChange} className="w-full border p-2 rounded mb-2" required />
//                 <input type="text" name="pinCode" placeholder="Pin Code" value={address.pinCode} onChange={handleAddressChange} className="w-full border p-2 rounded" required />
//             </div>

//             {/* Payment Method Selection */}
//             <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">Payment Method</label>
//                 <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="w-full border p-2 rounded">
//                     <option value="credit-card">Credit/Debit Card</option>
//                     <option value="upi">UPI</option>
//                     <option value="cod">Cash on Delivery</option>
//                 </select>
//             </div>

//             {/* Card Payment Form */}
//             {paymentMethod === "credit-card" && (
//                 <form onSubmit={handlePayment} className="space-y-4">
//                     <input type="text" name="name" placeholder="Cardholder Name" value={cardDetails.name} onChange={handleCardChange} className="w-full border p-2 rounded" required />
//                     <input type="text" name="cardNumber" placeholder="Card Number" value={cardDetails.cardNumber} onChange={handleCardChange} className="w-full border p-2 rounded" required />
//                     <div className="flex space-x-2">
//                         <input type="text" name="expiry" placeholder="MM/YY" value={cardDetails.expiry} onChange={handleCardChange} className="w-1/2 border p-2 rounded" required />
//                         <input type="text" name="cvv" placeholder="CVV" value={cardDetails.cvv} onChange={handleCardChange} className="w-1/2 border p-2 rounded" required />
//                     </div>
//                     <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 px-4 mt-4 rounded hover:bg-blue-600 transition-all">
//                         Pay ₹{totalAmount.toLocaleString("en-IN")}
//                     </button>
//                 </form>
//             )}

//             {/* UPI Payment */}
//             {paymentMethod === "upi" && (
//                 <div className="mt-4">
//                     <p className="text-gray-600 text-center">Scan the QR code or enter your UPI ID at checkout.</p>
//                     <img src={Qr} alt="Qr code" className="w-50 mx-auto my-3" />
//                     <input 
//                         type="text" 
//                         placeholder="Enter UPI ID (e.g., yourname@upi)" 
//                         value={upiId}
//                         onChange={(e) => setUpiId(e.target.value)}
//                         className="w-full border p-2 rounded text-center"
//                         required
//                     />
//                     <button onClick={() => {
//                             if (!upiId.trim()) {
//                                 alert("Please enter a valid UPI ID.");
//                                 return;
//                             }
//                             handlePayment();
//                         }} 
//                         className="w-full bg-blue-500 text-white font-semibold py-2 px-4 mt-4 rounded hover:bg-blue-600 transition-all">
//                         Pay via UPI
//                     </button>
//                 </div>
//             )}

//             {/* Cash on Delivery */}
//             {paymentMethod === "cod" && (
//                 <div className="mt-4">
//                     <p className="text-gray-600">You can pay when your order arrives.</p>
//                     <button onClick={handlePayment} className="w-full bg-green-500 text-white font-semibold py-2 px-4 mt-4 rounded hover:bg-green-600 transition-all">
//                         Confirm Order
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Payment;




import { useContext, useState } from "react";
import strip from '../assets/Stripe-Logo.png'
import razorpay from '../assets/razorpay-logo.png'
import { useNavigate } from "react-router-dom";


const Payment = () => {

    const { cart, setCart } = useContext(CartContext);

    const subTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const DELIVERY_FEE = subTotal > 10000 ? 0 : 50;
    const totalAmount = subTotal + DELIVERY_FEE;

    const [method, setMethod] = useState('cod')
    
    const navigate = useNavigate()


    return (
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 mn-h-[80vh] border-t my-8 md:my-20 mx-0 md:mx-20">
            {/* left side */}
            <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
                <div className="text-xl sm:text-2xl my-3">
                    <h2 className="uppercase font-normal text-gray-400 inline-block" style={{fontFamily : 'sans-serif'}}>delivery <span className="text-black">information</span><hr className="border-2 w-[40%] mt-1 border-red-500 rounded-2xl" /></h2>
                </div>

                <div className="flex gap-3">
                    <input type="text" placeholder="First Name" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
                    <input type="text" placeholder="Last Name" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
                </div>

                <input type="email" placeholder="Email Address" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
                <input type="text" placeholder="Street" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
                
                <div className="flex gap-3">
                    <input type="text" placeholder="City" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
                    <input type="text" placeholder="State" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
                </div>

                <div className="flex gap-3">
                    <input type="text" placeholder="Pincode" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
                    <input type="text" placeholder="Country" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
                </div>

                <input type="number" placeholder="Mobile No." className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />


            </div>

            {/* right side */}
            <div className="mt-9">
                <div className="mt-8 min-w-80" style={{fontFamily : 'sans-serif'}}>
                    <h2 className="uppercase font-normal text-gray-400 mb-3 inline-block">cart <span className="text-black">totals</span><hr className="border-2 w-[40%] mt-1 border-red-500 rounded-2xl" /></h2>
                    <p className="text-xs py-2 border-b border-gray-300">Subtotal <span className="float-end">₹ {subTotal}</span></p>
                    <p className="text-xs py-2 border-b border-gray-300">Delivery Fee <span className="float-end">₹ {DELIVERY_FEE}</span></p>
                    <p className="text-xs pt-2 font-bold">Total <span className="float-end">₹ {totalAmount}</span></p>
                </div>

                <div className="mt-9">
                    <h2 className="uppercase font-normal text-gray-400 mb-3 inline-block">payment <span className="text-black">method</span><hr className="border-2 w-[50%] mt-1 border-red-500 rounded-2xl" /></h2>

                    {/* Payment */}
                    <div className="flex gap-3 flex-col lg:flex-row">
                        <div onClick={() => setMethod('strip')} className="flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer">
                            <p className={`min-w-3 h-3 border border-gray-300 rounded-full ${method === 'strip' ? 'bg-green-400' : ''}`}></p>
                            <img className="h-5 mx-4" src={strip} alt="" />
                        </div>

                        <div onClick={() => setMethod('razorpay')} className="flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer">
                            <p className={`min-w-3 h-3 border border-gray-300 rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
                            <img className="h-5 mx-4" src={razorpay} alt="" />
                        </div>
                        <div onClick={() => setMethod('cod')} className="flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer">
                            <p className={`min-w-3 h-3 border border-gray-300 rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                            <p className="text-gray-500 text-sm font-medium uppercase mx-4">cash on delivery</p>
                        </div>
                    </div>

                    <div className="w-full text-end mt-8">
                        <button onClick={() => navigate('/order')} className="bg-black text-white px-16 py-3 text-sm">Place Order</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Payment




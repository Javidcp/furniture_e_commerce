import { useContext } from "react";
import { CartContext } from "../components/cart/CartContext"; 
import { Link, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";


function Cart() {
    const { cart, updateQuantity, removeFromCart } = useContext(CartContext);
    const navigate = useNavigate()

    const subTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    // Flat delivery charge
    let DELIVERY_FEE = subTotal > 10000 ? 0 : 250;
    const totalAmount = subTotal + DELIVERY_FEE;

    return (
        <div className=" mx-auto p-6 mt-10 md:mt-20">
            <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>

        <div className="flex flex-col md:flex-row gap-3">
            {cart.length === 0 ? (
                <p>Your cart is empty. <Link to="/" className="text-blue-500">Continue Shopping</Link></p>
            ) : (
                <>
                    <div className="w-full border-collapse rounded-2xl shadow">
                            {cart.map((item) => (
                                <div key={item.id} className="relative">
                                    <div className="p-3 flex gap-3">
                                        <img src={item.image} alt={item.name} className="w-20 sm:w-48 object-cover rounded" />
                                        <div>
                                            <div className="font-light text-gray-500 text-sm sm:text-xl">{item.name}</div>
                                            <div className="flex relative font-semibold">
                                                <p className="text-black mt-2 text-md sm:text-2xl">₹ {item.price.toLocaleString("en-IN")}</p>
                                                <p className="text-gray-500 mt-4 ml-3 line-through text-xs sm:text-sm">₹ {item.oldprice.toLocaleString("en-IN")}</p>
                                            </div>
                                            <div className="text-green-800 font-semibold flex mt-1 text-xs sm:md">
                                                <p>{item.off}% OFF </p>
                                                <p>&nbsp;- ₹ {item.oldprice - item.price} Saved</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-2 absolute right-2.5 bottom-2.5">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="py-0.5 px-2.5 rounded-full shadow-sm"
                                            disabled={item.quantity.toLocaleString("en-IN") <= 1}
                                        >-</button>
                                        <span className="px-4">{item.quantity}</span>
                                        <button 
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="py-0.5 px-2 rounded-full shadow-sm"
                                        >+</button>
                                    </div>
                                    
                                    <div className="p-3">
                                        <button 
                                            onClick={() => removeFromCart(item.id)}
                                            className=" text-xl absolute right-3 text-red-500 top-3"
                                        ><MdDelete /></button>
                                    </div>
                                </div>
                            ))}
                        </div>

                    {/* Summary Section */} 
                    <div className="mt-6 md:mt-0 p-4 rounded-2xl shadow-sm w-[300px] relative mx-auto md:mx-0 h-[260px]">
                        <p className="font-semibold text-sm border-b pb-0.5 border-gray-300">Price summary</p>
                        <p className="text-md font-light text-gray-500 border-b border-dashed pb-1.5">Subtotal: <span className="float-end">₹ {subTotal.toLocaleString("en-IN")}</span></p>
                        <p className="text-md font-light text-gray-500 border-b border-dashed pb-1.5">Delivery Fee: <span className="float-end">₹ {DELIVERY_FEE} <span className="line-through text-xs">{DELIVERY_FEE !== 0 ? '' : '250'}</span></span></p>
                        <p className="text-md font-semibold mt-4">Total Amount: <span className="float-end">₹{totalAmount.toLocaleString("en-IN")}</span></p>
                        <button onClick={() => navigate('/payment')} className="w-full md:w-fit md:mt-0 bg-green-600 text-white py-3 px-5 rounded-sm text-md md:absolute bottom-2 right-[10%] hover:bg-green-700 transition">
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    </div>
    );
}

export default Cart;

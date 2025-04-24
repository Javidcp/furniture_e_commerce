import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import { MdBlock } from "react-icons/md";




const UserDetails = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);


    
    useEffect(() => {
        axios
            .get(`http://localhost:5659/users/${id}`)
            .then((response) => {
                const userData = response.data;
                setUser(userData);

                
                const total = userData.purchaseHistory.reduce((acc, order) => acc + order.totalAmount, 0);
                setTotalAmount(total);
            })
            .catch((error) => console.log("Error Fetching User Details", error));
    }, [id]);

    if (!user) return <div>Loading...</div>;

    return (
        <div className="mt-12 min-h-[83.5vh]">

            {/* Customer details */}
            <div className="bg-gray-100 text-black p-3 rounded-md my-4">
                <h2 className="text-2xl font-medium p-2 rounded mb-5">Customer Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-6">
                    <div className="text-gray-600 font-medium"><span className="block uppercase text-sm font-medium text-gray-400 my-2">Name</span> {user.name.toUpperCase()}</div>
                    <div className="text-gray-600 font-medium"><span className="block uppercase text-sm font-medium text-gray-400 my-2">Location</span> {user.purchaseHistory?.length > 0 ? user.purchaseHistory[0]?.address?.country : "Not Available"}</div>
                    <div className="text-gray-600 font-medium"><span className="block uppercase text-sm font-medium text-gray-400 my-2">Email</span> {user.email}</div>
                    <div className="text-gray-600 font-medium"><span className="uppercase text-sm font-medium text-gray-400">Status</span>{user.blocked === false ? <span className="flex text-green-400 my-2"> <TiTick size={23} /> Activated</span> : <span className="flex text-red-600 my-2"><MdBlock className="mt-1 mr-1" size={18} />  Blocked</span>}</div>
                    <div className="text-gray-600 font-medium"><span className="block uppercase text-sm font-medium text-gray-400 my-2">Phone Number</span> {user.purchaseHistory?.length > 0 ? user.purchaseHistory[0]?.address?.mobile : "Not Available"}</div>
                    <div className="text-gray-600 font-medium"><span className="block uppercase text-sm font-medium text-gray-400 my-2">Sign Up</span> {user.createdAt}</div>
                </div>

                <h2 className="text-2xl font-medium p-2 rounded my-5">Customer Card</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-6">
                    <div className="text-gray-600 font-medium"><span className="block uppercase text-sm font-medium text-gray-400 my-2">Card Number</span>
                        {(() => { //IIFE
                            const purchaseHistory = user?.purchaseHistory || [];
                            const lastPurchase = purchaseHistory.find((order) => order.cardDetails);
                            return lastPurchase?.cardDetails?.cardNumber || "Not Available";
                        })()}
                    </div>
                    <div className="text-gray-600 font-medium"><span className="block uppercase text-sm font-medium text-gray-400 my-2">Card Owner</span>
                        {(() => {
                            const purchaseHistory = user?.purchaseHistory || [];
                            const lastPurchase = purchaseHistory.find((order) => order.cardDetails);
                            return lastPurchase?.cardDetails?.owner || "Not Available";
                        })()}
                    </div>
                    <div className="text-gray-600 font-medium"><span className="block uppercase text-sm font-medium text-gray-400 my-2">Card Owner</span>
                        {(() => {
                            const purchaseHistory = user?.purchaseHistory || [];
                            const lastPurchase = purchaseHistory.find((order) => order.cardDetails);
                            return lastPurchase?.cardDetails?.cvv || "Not Available";
                        })()}
                    </div>
                    <div className="text-gray-600 font-medium"><span className="block uppercase text-sm font-medium text-gray-400 my-2">Card Owner</span>
                        {(() => {
                            const purchaseHistory = user?.purchaseHistory || [];
                            const lastPurchase = purchaseHistory.find((order) => order.cardDetails);
                            return lastPurchase?.cardDetails?.expiryDate || "Not Available";
                        })()}
                    </div>
                </div>
            </div>

            {/* Customer Card Details */}
            <div className="bg-gray-100 text-black p-3 rounded-md">
                <h2 className="text-2xl font-medium p-2 rounded mb-5">Customer Activity</h2>
                <div className="px-6">
                    <div className="text-gray-600 font-medium"><span className="block uppercase text-sm font-medium text-gray-400 my-2">Total amount purchased</span>₹ {totalAmount.toLocaleString("en-In")}</div>
                    <table className="w-full mt-3">
                        <thead>
                            <tr className="bg-gray-200 uppercase">
                                <th className="p-2 text-start">id</th>
                                <th className="p-2">Name</th>
                                <th className="p-2">quantity</th>
                                <th className="p-2">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user.purchaseHistory.length > 0 ? (
                                user.purchaseHistory.map((order, orderIndex) => (
                                order.items.map((item, itemIndex) => (
                                    <tr key={`${orderIndex}-${itemIndex}`} className="border-b border-gray-300 bg-white">
                                    <td className="p-2">{order.orderId}</td>
                                    <td className="text-center p-2">{item.name}</td>
                                    <td className="text-center p-2">{item.quantity}</td>
                                    <td className="text-center p-2">₹ {item.price.toLocaleString("en-IN")}</td>
                                    </tr>
                                ))
                                ))
                            ) : (
                                <tr>
                                <td className="p-2 text-center" colSpan={4}>
                                    No Orders Available
                                </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default UserDetails;

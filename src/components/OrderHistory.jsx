import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/Authentication/AuthContext";
import Swal from 'sweetalert2'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from "./Authentication/api";



const OrderHistory = () => {
    const navigate = useNavigate();
    const { user, token } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const userId = user._id

    useEffect(() => {
        if (!user || !token) {
            toast.info("You need to log in to view order history.");
            navigate("/login");
            return;
        }
        const fetchOrders = async () => {
            try {
                const response = await api.get(`/api/orders/user/${userId}`);

                const sortedOrder = (response.data.orders || []).sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                )
                
                setOrders(sortedOrder);
            } catch (error) {
                console.error("Error fetching order history:", error);
            }
        };

        fetchOrders();
    }, [userId, token]);

    const cancelButton = (orderStatus) => {
        switch (orderStatus) {
            case "delivered" :
            case "cancelled" :
                return "hidden"
        }
    }

    const cancelProduct = async (_id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn bg-green-500 py-2 px-4 text-white mx-1",
                cancelButton: "btn bg-red-600 px-4 py-2 text-white mx-1"
            },
            buttonsStyling: false
        });
            const result = await swalWithBootstrapButtons.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, cancel it!",
                cancelButtonText: "No",
                reverseButtons: true
            })
            if (result.isConfirmed) {
                try {
                    await api.patch(`/api/orders/${_id}/cancel`, {});
                    
                    const updatedOrders = orders.map((order) =>
                        order._id === _id ? { ...order, orderStatus: "cancelled" } : order
                    );
                    setOrders(updatedOrders);
        
                    swalWithBootstrapButtons.fire({
                        title: "Cancelled!",
                        text: "Your product has been cancelled.",
                        icon: "success"
                    });
                } catch (error) {
                    console.log("Error Updating Status", error);
                }
            } else {
                swalWithBootstrapButtons.fire({
                    title: "Great",
                    text: "Cancellation cancelled",
                    icon: "error"
                });
            };
    }

    
    

    const statusColor = (orderStatus) => {
        switch (orderStatus) {
            case 'processing':
                return 'text-yellow-400 font-semibold';
            case 'shipped':
                return 'text-orange-500 font-semibold';
            case 'delivered':
                return 'text-green-400 font-semibold';
            case 'cancelled':
                return 'text-red-500 font-semibold';
            default :
                return 'text-white'
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-6 mt-20 bg-white rounded-lg min-h-[34.3vh]">
            <h2 className="text-2xl font-bold mb-4 text-center">Order History</h2>
            {orders.length === 0 ? (
                <p className="text-gray-500 text-center">No past orders found.</p>
            ) : (
                orders.map((order) => (
                    <div key={order._id} className="border p-4 rounded mb-4 bg-gray-50 relative">
                        <p><strong>Order ID:</strong> {order._id}</p>
                        <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                        <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                        <p className={`${statusColor(order.orderStatus)}`}><strong className="text-black font-bold">Status:</strong> {order.orderStatus}</p>
                        <p><strong>Total:</strong> ₹ {order.totalAmount.toLocaleString("en-IN")}</p>

                        <div className="mt-2">
                            <h4 className="text-md font-semibold">Items:</h4>
                            {order.items.map((item, index) => (
                                <p key={index} className="text-sm">
                                    {item.name} (x{item.quantity}) - ₹{item.price * item.quantity}
                                </p>
                            ))}
                        </div>
                        <div> 
                            {order.status !== "Cancelled" &&
                            <button onClick={() => cancelProduct(order._id)} className={`absolute right-1 top-1 py-1 px-2 rounded text-white bg-red-600 ${cancelButton(order.status)}`}>
                                    Cancel
                                </button> 
                            }
                        </div>
                    </div>
                ))
            )}

            <div className="w-full text-center mt-6">
                <button onClick={() => navigate("/")} className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">
                    Continue Shopping
                </button>
            </div>
        </div>
    );
};

export default OrderHistory;

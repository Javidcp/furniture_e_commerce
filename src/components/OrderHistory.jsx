import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/Authentication/AuthContext";
import axios from "axios";
import Swal from 'sweetalert2'


const OrderHistory = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    

    useEffect(() => {
        if (!user) {
            Swal.fire("LogIn","You need to log in to view order history.","info");
            navigate("/login");
            return;
        }

        // Fetch user order history from json
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:5659/users/${user.id}`);
                const sortedOrders = (response.data.purchaseHistory || []).sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                );
                setOrders(sortedOrders);
            } catch (error) {
                console.error("Error fetching order history:", error);
            }
        };

        fetchOrders();
    }, [user, navigate]);

    const cancelButton = (status) => {
        switch (status) {
            case "Delivered" :
                return "hidden"
            case "Cancelled" :
                return "hidden"
        }
    }

    const cancelProduct = async (orderId) => {
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
                    const updateOrder = orders.map((order) =>
                        order.orderId === orderId ? {...order, status : 'Cancelled'} : order
                    )
                    setOrders(updateOrder)
        
                    await axios.patch(`http://localhost:5659/users/${user.id}`, {
                        purchaseHistory: updateOrder
                    })

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

    const statusColor = (status) => {
        switch (status) {
            case 'Processing':
                return 'text-yellow-400 font-semibold';
            case 'Shipped':
                return 'text-orange-500 font-semibold';
            case 'Delivered':
                return 'text-green-400 font-semibold';
            case 'Cancelled':
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
                    <div key={order.orderId} className="border p-4 rounded mb-4 bg-gray-50 relative">
                        <p><strong>Order ID:</strong> {order.orderId}</p>
                        <p><strong>Order Date:</strong> {order.date}</p>
                        <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                        <p className={`${statusColor(order.status)}`}><strong className="text-black font-bold">Status:</strong> {order.status}</p>
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
                            <button onClick={() => cancelProduct(order.orderId)} className={`absolute right-1 top-1 py-1 px-2 rounded text-white bg-red-600 ${cancelButton(order.status)}`}>
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

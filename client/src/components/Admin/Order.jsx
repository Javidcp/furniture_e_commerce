import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const Order = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredOrders, setFilteredOrders] = useState([])
    const [statuses, setStatuses] = useState([])
    const [selectedStatus, setSelectedStatus] = useState("All Category")

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await axios.get("http://localhost:5655/api/orders/allOrder", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const allOrders = response.data.orders.map(order => ({
                    ...order,
                    customerName: order.userId?.name || "Unknown",
                    userId: order.userId?._id || "Unknown"
                }))
                setOrders(allOrders);
                setFilteredOrders(allOrders);
                extractStatus(allOrders);

            } catch (error) {
                console.error("Error fetching orders :", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);


    const extractStatus = (orders) => {
        const uniqueStatus = ["All Category", ...new Set(orders.map((p) => p.orderStatus))];
        setStatuses(uniqueStatus);
    };

        const handleStatusChange = async (orderId, userId, newStatus) => {

            try {
                const token = localStorage.getItem("token");

                await axios.put(`http://localhost:5655/api/orders/update-status/${orderId}`,
                    { orderStatus: newStatus},
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        }
                    }
                );
        
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order._id === orderId ? { ...order, orderStatus: newStatus } : order
                    )
                );
                setFilteredOrders((prevFilteredOrders) =>
                    prevFilteredOrders.map((order) =>
                        order._id === orderId ? { ...order, orderStatus: newStatus } : order
                    )
                );
            } catch (error) {
                console.error("Error updating order status:", error);
            }
        };
        
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

    const filterStatus = (e) => {
        const orderStatus = e.target.value;
        setSelectedStatus(orderStatus)
        if (orderStatus === "All Category") {
            setFilteredOrders(orders)
        } else {
            setFilteredOrders(orders.filter((p) => p.orderStatus === orderStatus))
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split("T")[0];
    };


    if (loading) return <div>Loading orders...</div>;

    return (
        <div className="mt-6 p-4">
            <h2 className="text-2xl font-bold my-4 rounded bg-gray-200 p-2">All Orders</h2>
            <div className="mb-4">
                    <label className="mr-2">Filter by Category:</label>
                    <select 
                        className="p-2 bg-gray-200  border border-gray-200 rounded outline-0" 
                        value={selectedStatus} 
                        onChange={filterStatus}
                    >
                        {statuses.map((status) => ( 
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </div>
            <table className="w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-200 uppercase">
                        <th className="p-2 text-left">Order ID</th>
                        <th className="p-2">Customer</th>
                        <th className="p-2">Total Quantity</th>
                        <th className="p-2 text-left">Total Price</th>
                        <th className="p-2">Date</th>
                        <th className="p-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.length > 0 ? (
                        filteredOrders.map((order) => {
                            const totalQuantity = order.items.reduce((sum, item) => sum + item.quantity, 0);
                            const totalPrice = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

                            return (
                                <tr key={order._id} className="border-b border-gray-300">
                                    <td className="p-2">
                                        <Link className="hover:underline" to={`/dashboard/orders/${order._id}`}>
                                            {order._id}
                                        </Link>
                                    </td>
                                    <td className="p-2 text-center">{order.customerName}</td>
                                    <td className="p-2 text-center">{totalQuantity}</td>
                                    <td className="p-2 ">₹ {totalPrice.toLocaleString("en-IN")}</td>
                                    <td className="p-2 text-center">{formatDate(order.createdAt)}</td>
                                    <td className="p-2 text-center">
                                        <select
                                            className={`border border-gray-400 p-1 rounded outline-0 ${statusColor(order.orderStatus)}`}
                                            value={order.orderStatus}
                                            onChange={(e) => handleStatusChange(order._id, order.userId, e.target.value)}
                                        >
                                            <option className=" bg-gray-200 text-black" value="processing">Processing</option>
                                            <option className=" bg-gray-200 text-black" value="shipped">Shipped</option>
                                            <option className=" bg-gray-200 text-black" value="delivered">Delivered</option>
                                            <option className=" bg-gray-200 text-black" value="cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td className="p-2 text-center" colSpan={5}>
                                No Orders Available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Order;

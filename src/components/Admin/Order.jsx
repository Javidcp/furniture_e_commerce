import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const Order = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get("http://localhost:5659/users");
                const allOrders = response.data.flatMap(user => 
                    user.purchaseHistory?.map(order => ({
                        ...order,
                        customerName: user.name || "Unknown",
                        userId: user.id
                    })) || []
                );
                

                setOrders(allOrders);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);



      // update the order status
        const handleStatusChange = async (orderId, userId, newStatus) => {
        try {
            // fetch the user to get their purchase history
            const userResponse = await axios.get(`http://localhost:5659/users/${userId}`);
            const user = userResponse.data;

            // Find the order inside the purchasehistory
            const updatedOrders = user.purchaseHistory.map(order =>
                order.orderId === orderId ? { ...order, status: newStatus } : order
            );

            // update the users purchaseHistory in server
            await axios.put(`http://localhost:5659/users/${userId}`, {
                ...user,
                purchaseHistory: updatedOrders
            });

            // update the state in frontend
            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order.orderId === orderId ? { ...order, status: newStatus } : order
                )
            );
        } catch (error) {
            console.error("Error updating order status:", error);
        }
    };

    // status color
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

    if (loading) return <div>Loading orders...</div>;

    return (
        <div className="mt-6 p-4">
            <h2 className="text-2xl font-bold my-4 rounded bg-gray-200 p-2">All Orders</h2>
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
                    {orders.length > 0 ? (
                        orders.map((order) => {
                            const totalQuantity = order.items.reduce((sum, item) => sum + item.quantity, 0);
                            const totalPrice = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

                            return (
                                <tr key={order.orderId} className="border-b border-gray-300">
                                    <td className="p-2">
                                        <Link to={`/dashboard/orders/orderdetails/${order.orderId}`}>
                                            {order.orderId}
                                        </Link>
                                    </td>
                                    <td className="p-2 text-center">{order.customerName || "Unknown"}</td>
                                    <td className="p-2 text-center">{totalQuantity}</td>
                                    <td className="p-2 ">₹ {totalPrice.toLocaleString("en-IN")}</td>
                                    <td className="p-2 text-center">{order.date}</td>
                                    <td className="p-2 text-center">
                                        <select
                                            className={`border border-gray-400 p-1 rounded outline-0 ${statusColor(order.status)}`}
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.orderId, order.userId, e.target.value)}
                                        >
                                            <option className=" bg-gray-200 text-black" value="Processing">Processing</option>
                                            <option className=" bg-gray-200 text-black" value="Shipped">Shipped</option>
                                            <option className=" bg-gray-200 text-black" value="Delivered">Delivered</option>
                                            <option className=" bg-gray-200 text-black" value="Cancelled">Cancelled</option>
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

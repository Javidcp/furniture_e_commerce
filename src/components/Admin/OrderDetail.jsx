import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../Authentication/api";

const OrderDetails = () => {
    const { orderId } = useParams();
    const [ order, setOrder ] = useState(null);
    const [error, setError] = useState(null);


    //fetch order data
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await api.get(`/api/orders/${orderId}`)
                setOrder(res.data);
            } catch (error) {
                console.log("Error Fetching Order Details", error);
                setError(error)
            }
        } 

        fetchOrder()
    }, [orderId])

    const handleStatus = (orderStatus) => {
        switch (orderStatus) {
            case 'processing' :
                return 'text-yellow-400';
            case 'shipped' :
                return 'text-orange-500';
            case 'delivered' :
                return 'text-green-500';
            case 'cancelled' :
                return 'text-red-500';
            default :
                return orderStatus
        }
    }

    if (error) return <p className="mt-20 text-red-500">{error.message || "Something went wrong."}</p>;
    if (!order) return <p className="mt-20">No order details available.</p>;
    

    return (
        <div className="mt-12">
            <h2 className="text-2xl font-bold my-4 rounded bg-gray-200 p-2">Order Details</h2>
            <div className="bg-gray-100 p-4 rounded mb-5">
                <div className="tracking-wider mb-1"><strong className="text-gray-600 tracking-normal">Order ID :</strong> {order._id}</div>
                <div className="tracking-widest mb-1"><strong className="text-gray-600 tracking-normal">Customer Name :</strong> {order.name}</div>
                <div className="tracking-widest mb-1"><strong className="text-gray-600 tracking-normal">Order Placed :</strong> {new Date(order.createdAt).toLocaleString()}</div>
                <div className="tracking-widest mb-1"><strong className="text-gray-600 tracking-normal">Payment Method  :</strong> {order.paymentMethod}</div>
                <div className={`tracking-widest mb-1 ${handleStatus(order.orderStatus)} font-medium`}><strong className={`text-gray-600 tracking-normal`}>Order Status  :</strong> {order.orderStatus}</div>
            </div>

            <div className="p-5 bg-gray-100 rounde ">
                <h2 className="text-xl font-bold">Product Details</h2>
                <div className="ml-10">
                    {order.items?.map((item) => (
                        <div key={item._id} className="my-10">
                            <div className="tracking-wider mb-1"><strong className="text-gray-600 tracking-normal">Name :</strong> {item.name}</div>
                            <div className="tracking-wider mb-1"><strong className="text-gray-600 tracking-normal">Brand :</strong> {item.brand}</div>
                            <div className="tracking-wider mb-1"><strong className="text-gray-600 tracking-normal">Quantity :</strong> {item.quantity}</div>
                            <div className="tracking-wider mb-1"><strong className="text-gray-600 tracking-normal">Price :</strong>₹ {item.price} <span className="text-[9px] ml-2">₹ {item.oldprice}</span></div>
                            <img src={item.image} className="w-60 h-60 m-2 rounded" alt={item.name} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;

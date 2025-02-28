import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
    const { orderId } = useParams();
    const [ order, setOrder ] = useState(null);

    //fetch order data
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get(`http://localhost:5659/users`)
                const users = response.data

                console.log("response", users);
                
                let foundOrder = null;

                for (let user of users) {
                    if (user.purchaseHistory) {
                        foundOrder = user.purchaseHistory.find((order) => order.orderId === orderId)
                        if (foundOrder) break;
                    }
                }
                
                    if (foundOrder) {
                        setOrder(foundOrder)
                    } else {
                        console.log("Order Not Found");
                    }
                
                
            } catch (error) {
                console.log("Error Fetching Order Details", error);
            }
        } 

        fetchOrder()

    }, [orderId])

    const handleStatus = (status) => {
        switch (status) {
            case 'Processing' :
                return 'text-yellow-400';
            case 'Shipped' :
                return 'text-orange-500';
            case 'Delivered' :
                return 'text-green-500';
            case 'Cancelled' :
                return 'text-red-500';
            default :
                return status
        }
    }

    if (!order) return <p className="mt-20">No order details available.</p>;

    return (
        <div className="mt-12">
            <h2 className="text-2xl font-bold my-4 rounded bg-gray-200 p-2">Order Details</h2>
            <div className="bg-gray-100 p-4 rounded mb-5">
                <div className="tracking-wider mb-1"><strong className="text-gray-600 tracking-normal">Order ID :</strong> {order.orderId}</div>
                <div className="tracking-widest mb-1"><strong className="text-gray-600 tracking-normal">Customer Name :</strong> {order.name.toUpperCase()}</div>
                <div className="tracking-widest mb-1"><strong className="text-gray-600 tracking-normal">Order Placed :</strong> {order.date}</div>
                <div className="tracking-widest mb-1"><strong className="text-gray-600 tracking-normal">Payment Method  :</strong> {order.paymentMethod}</div>
                <div className={`tracking-widest mb-1 ${handleStatus(order.status)} font-normal`}><strong className={`text-gray-600 tracking-normal`}>Order Status  :</strong> {order.status}</div>
            </div>

            <div className="p-5 bg-gray-100 rounde ">
                <h2 className="text-xl font-bold">Product Details</h2>
                <div className="ml-10">
                    {order.items?.map((item) => (
                        <div key={item.id} className="my-10">
                            <div className="tracking-wider mb-1"><strong className="text-gray-600 tracking-normal">Name :</strong> {item.name}</div>
                            <div className="tracking-wider mb-1"><strong className="text-gray-600 tracking-normal">Brand :</strong> {item.brand}</div>
                            <div className="tracking-wider mb-1"><strong className="text-gray-600 tracking-normal">Price :</strong>₹ {item.price.toLocaleString("en-IN")} <span className="text-[9px] ml-2">₹ {item.oldprice.toLocaleString("en-IN")}</span></div>
                            <img src={item.image} className="w-60 h-60 m-2 rounded" alt={item.name} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;

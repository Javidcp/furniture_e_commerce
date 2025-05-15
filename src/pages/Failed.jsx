import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../components/Authentication/api';



const OrderFailed = () => {
    const { orderId } = useParams();

  

  useEffect(() => {
    const markAsFailed = async () => {
      try {
        await api.patch(
          `/api/orders/${orderId}/payment-status`,
          { paymentStatus: 'failed' },

        );
        toast.error("Your payment was not successful");
      } catch (error) {
        console.error("Failed to update order status:", error);
      }
    };

    markAsFailed();
  }, [orderId]);

  return (
    <div className="order-failed">
      <h1>Payment Failed</h1>
      <p>Your order #{orderId} could not be processed.</p>
    </div>
  );
};

export default OrderFailed;
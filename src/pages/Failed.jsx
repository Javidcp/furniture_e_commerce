import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuth } from '../components/Authentication/useAuth';


const OrderFailed = () => {
    const { orderId } = useParams();
    const { user } = useAuth()
  

  useEffect(() => {
    const markAsFailed = async () => {
      try {
        await axios.patch(
          `http://localhost:5655/api/orders/${orderId}/payment-status`,
          { paymentStatus: 'failed' },
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        Swal.fire("Payment Failed", "Your payment was not successful", "error");
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
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../components/Authentication/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../components/Authentication/api';


const OrderSuccess = () => {
  const { orderId } = useParams();
  const { user, token } = useAuth();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const confirmOrder = async () => {
      if (!token) {
        toast.error("Authentication required. Please log in.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await api.patch(
          `/api/orders/${orderId}/payment-status`,
          { paymentStatus: 'paid' },
          { 
            headers: { 
              'Content-Type': 'application/json'
            } 
          }
        );

        if (response.data.success) {
          setIsConfirmed(true);
        } else {
          throw new Error(response.data.message || 'Payment confirmation failed');
        }
      } catch (error) {
        console.error('Payment confirmation error:', error.response?.data || error.message);
        let errorMessage = "Failed to confirm payment";
        
        if (error.response) {
          if (error.response.status === 403) {
            errorMessage = "You're not authorized to confirm this payment";
          } else if (error.response.data?.message) {
            errorMessage = error.response.data.message;
          }
        }
        
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    confirmOrder();
  }, [orderId, user, token]);

  if (isLoading) {
    return (
      <div>
        <h1>Processing your order...</h1>
        <p>Please wait while we confirm your payment.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center h-screen justify-center space-y-3">
      {isConfirmed ? (
        <>
          <h1>Order Successful!</h1>
          <p>Your order <span className='font-semibold'>#{orderId}</span> has been confirmed.</p>
          <p>Thank you for your purchase!</p>
          <button onClick={() => navigate('/')} className='bg-black text-white p-2 rounded-lg'>Back to Home page</button>
        </>
      ) : (
        <>
          <h1 className='text-2xl'>Order Received!</h1>
          <p>Your order <span className='font-semibold'>#{orderId}</span> has been placed, but payment confirmation is pending.</p>
          <button onClick={() => navigate('/')} className='bg-black text-white p-2 rounded-lg'>Back to Home page</button>
        </>
      )}
    </div>
  );
};

export default OrderSuccess;
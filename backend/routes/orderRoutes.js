import express from 'express';
import { 
    createOrder, 
    getUserOrders, 
    updateOrderPaymentStatus,
    getAllOrders,
    updateOrderStatus,
    cancelOrder,
    getOrderById
} from '../controllers/orderController.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { verifyAdmin } from '../middleware/verifyAdmin.js';

const router = express.Router();

router.use(verifyToken);
router.post('/', createOrder);
router.get('/user/:userId', getUserOrders);
router.patch('/:orderId/payment-status', updateOrderPaymentStatus);


router.get('/allOrder', verifyToken, verifyAdmin, getAllOrders)
router.put('/update-status/:orderId',verifyAdmin, updateOrderStatus)
router.patch('/:id/cancel', cancelOrder)
router.get("/:orderId", getOrderById)


export default router;
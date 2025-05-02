// routes/orderRoutes.js
import express from 'express';
import { createOrder, getUserOrders, getAllOrders, updateOrderStatus } from '../controllers/orderController.js';
import { verifyToken } from '../middleware/verifyToken.js';  // Import the verifyToken middleware
import { verifyAdmin } from '../middleware/verifyAdmin.js';  // Import the verifyAdmin middleware

const router = express.Router();

// Protect this route by verifying token (authentication required)
router.post('/', verifyToken, createOrder);

// Protect this route by verifying token (authentication required)
router.get('/user/:userId', verifyToken, getUserOrders);

// Admin-only route, check if user is admin
router.get('/', verifyAdmin, getAllOrders);

// Admin-only route, check if user is admin
router.put('/:id/status', verifyAdmin, updateOrderStatus);

export default router;

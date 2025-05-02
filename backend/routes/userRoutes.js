import express from "express";
import {
  addToCart,
  removeFromCart,
  addToPurchaseHistory,
  getCart,
  updateCart,
  clearCart,
  savePurchaseHistory
} from "../controllers/userController.js";

const router = express.Router();

// Existing routes
router.post("/cart/add", addToCart);
router.post("/cart/remove", removeFromCart);
router.post("/purchase-history/add", addToPurchaseHistory);

// 🔥 New routes expected by your frontend
router.get("/cart/:userId", getCart); // Get cart by userId
router.put("/cart/:userId", updateCart); // Update cart by userId
router.put("/users/:userId/clearCart", clearCart); // Clear cart
router.put("/users/:userId/purchaseHistory", savePurchaseHistory); // Save history

export default router;

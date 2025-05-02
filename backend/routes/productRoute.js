import express from "express";
import { getProductById, getProductsByCategory } from "../controllers/productController.js"; // Adjust path if needed

const router = express.Router();

router.get('/:id', getProductById)
// Handle GET /products
router.get('/', getProductsByCategory); 

export default router;

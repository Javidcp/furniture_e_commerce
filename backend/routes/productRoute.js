import express from "express";
import { getProductById, getProductsByCategory, getProducts, deleteProduct, updateProduct, addProduct } from "../controllers/productController.js";
const router = express.Router();

router.get("/all", getProducts)
router.get('/', getProductsByCategory); 
router.get('/:id', getProductById)
router.delete('/:id', deleteProduct);
router.put('/:id', updateProduct);
router.post('/', addProduct);


export default router;

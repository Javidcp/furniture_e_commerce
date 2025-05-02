
import Product from "../models/product.js";
import mongoose from "mongoose";

export const getProductById = async (req, res) => {
  const { id } = req.params;
  
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid product ID format' 
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ 
        success: false,
        message: 'Product not found' 
      });
    }

    // ✅ SEND the product as response!
    res.status(200).json(product);

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Controller: Get products by category
export const getProductsByCategory = async (req, res) => {
  const { category } = req.query;

  try {
    const relatedProducts = await Product.find({ category });
    res.json(relatedProducts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};




import Product from "../models/product.js";
import mongoose from "mongoose";

export const getProductById = async (req, res, next) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ 
      success: false,
      message: 'Invalid product ID format' 
    });
  }
  
  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ 
        success: false,
        message: 'Product not found' 
      });
    }

    res.status(200).json(product);

  } catch (error) {
    next(error)
  }
};

export const getProductsByCategory = async (req, res, next) => {
  const { category } = req.query;

  try {
    const relatedProducts = await Product.find({ category });
    res.json(relatedProducts);
  } catch (error) {
    next(error)
  }
};

export const getProducts = async (req, res, next) => {
  try {
      const products = await Product.find();
      res.status(200).json(products);
  } catch (error) {
      next(error)
  }
}


// Admin Panel

export const deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid product ID format' });
  }

  try {
      const deleted = await Product.findByIdAndDelete(id);
      if (!deleted) {
          return res.status(404).json({ success: false, message: 'Product not found' });
      }
      res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
      next(error);
  }
};


export const updateProduct = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid product ID' });
  }

  try {
      const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedProduct) {
          return res.status(404).json({ success: false, message: 'Product not found' });
      }

      res.status(200).json(updatedProduct);
  } catch (error) {
      next(error);
  }
};


export const addProduct = async (req, res, next) =>{
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ message: 'Product added', product: newProduct });
  } catch (err) {
    next(err)
  }
}
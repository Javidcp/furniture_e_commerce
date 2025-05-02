// Assuming you already have the necessary import for User model
import User from "../models/user.js";

// Add product to cart
export const addToCart = async (req, res) => {
  const { email, product } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Check if product already exists in the cart
    const existingProduct = user.cart.find(item => item.productId.toString() === product.productId);
    if (existingProduct) {
      // Update quantity if product exists
      existingProduct.quantity += product.quantity;
    } else {
      // Add new product to cart
      user.cart.push(product);
    }

    await user.save();
    res.status(200).json({ message: "Product added to cart", cart: user.cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove product from cart
export const removeFromCart = async (req, res) => {
  const { email, productId } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    user.cart = user.cart.filter(item => item.productId.toString() !== productId);
    await user.save();
    res.status(200).json({ message: "Product removed from cart", cart: user.cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add product to purchase history
export const addToPurchaseHistory = async ({ email, productId, name, image, price, quantity, category }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const newPurchase = { productId, name, image, price, quantity, category };

  user.purchaseHistory.push(newPurchase);
  user.cart = user.cart.filter(item => item.productId.toString() !== productId);
  await user.save();
};



// Get cart
export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate("cart.productId");

    if (!user) return res.status(404).json({ message: "User not found" });

    const cartItems = user.cart.map(item => ({
      _id: item.productId.id,
      quantity: item.quantity,
      name: item.productId.name,
      price: item.productId.price,
      oldprice: item.productId.oldprice,
      off: item.productId.off,
      image: item.productId.image,
      category: item.productId.category
    }));

    res.status(200).json({ cart: cartItems });
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ message: "Server error" });
  }
};




// Update cart
export const updateCart = async (req, res) => {
  const { cart } = req.body;
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.cart = cart;
    await user.save();
    res.json({ message: "Cart updated", cart: user.cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Clear cart
export const clearCart = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.cart = [];
    await user.save();
    res.json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Save to purchase history
export const savePurchaseHistory = async (req, res) => {
  const newOrder = req.body.purchaseHistory;

  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.purchaseHistory.push(newOrder);
    await user.save();
    res.json({ message: "Purchase history updated", history: user.purchaseHistory });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

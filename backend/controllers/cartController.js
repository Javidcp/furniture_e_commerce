import User from "../models/user.js";

export const addToCart = async (req, res, next) => {
  const { email, product } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const existingProduct = user.cart.find(item => item.productId.toString() === product.productId);
    if (existingProduct) {
      existingProduct.quantity += product.quantity;
    } else {
      user.cart.push(product);
    }

    await user.save();
    res.status(200).json({ message: "Product added to cart", cart: user.cart });
  } catch (err) {
    next(err)
  }
};

export const removeFromCart = async (req, res, next) => {
  const { email, productId } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    user.cart = user.cart.filter(item => item.productId.toString() !== productId);
    await user.save();
    res.status(200).json({ message: "Product removed from cart", cart: user.cart });
  } catch (error) {
    next(error)
  }
};

export const addToPurchaseHistory = async ({ email, productId, name, image, price, quantity, category }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const newPurchase = { productId, name, image, price, quantity, category };

  user.purchaseHistory.push(newPurchase);
  user.cart = user.cart.filter(item => item.productId.toString() !== productId);
  await user.save();
};

export const getCart = async (req, res, next) => {
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
  } catch (error) {
    next(error)
  }
};

export const updateCart = async (req, res, next) => {
  const { cart } = req.body;
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.cart = cart;
    await user.save();
    res.json({ message: "Cart updated", cart: user.cart });
  } catch (error) {
    next(error)
  }
};

export const savePurchaseHistory = async (req, res, next) => {
  const newOrder = req.body.purchaseHistory;

  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.purchaseHistory.push(newOrder);
    await user.save();
    res.json({ message: "Purchase history updated", history: user.purchaseHistory });
  } catch (error) {
    next(error)
  }
};

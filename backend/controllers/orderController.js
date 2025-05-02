  import Order from "../models/order.js";
  import User from "../models/user.js"

  // Create Order
  export const createOrder = async (req, res) => {
    const {
      userId,
      items,
      totalAmount,
      shippingAddress,
      paymentStatus,
      orderStatus
  } = req.body;

  console.log("Incoming Order Data:", req.body);

  // Validate inputs manually
  if (!userId || !items || items.length === 0 || !totalAmount || !shippingAddress) {
      return res.status(400).json({ message: "Invalid order data. Missing required fields." });
  }

  try {
      // Create the new order
      const newOrder = new Order({
          userId,
          items,
          totalAmount,
          shippingAddress,
          paymentStatus,
          orderStatus
      });

      // Save the order
      const savedOrder = await newOrder.save();

      // Add order ID to the user's purchase history
      const updatedUser = await User.findByIdAndUpdate(userId, {
          $push: { purchaseHistory: savedOrder._id }
      }, { new: true });

      if (!updatedUser) {
          return res.status(404).json({ message: "User not found" });
      }

      // Respond with the newly created order
      res.status(201).json({ message: "Order created successfully", order: savedOrder });
  } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ message: "Failed to create order" });
  }
}

  // Get orders for a user
  export const getUserOrders = async (req, res) => {
    try {
      const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  // Get all orders (admin)
  export const getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find().sort({ createdAt: -1 });
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  // Update order status (admin)
  export const updateOrderStatus = async (req, res) => {
    try {
      const { status } = req.body;
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        { orderStatus: status },
        { new: true }
      );
      res.status(200).json(updatedOrder);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

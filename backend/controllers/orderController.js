import Order from "../models/order.js";
import User from "../models/user.js";
import Product from "../models/product.js";
import mongoose from 'mongoose';


// create Order
export const createOrder = async (req, res, next) => {
  
    const { items, totalAmount, shippingAddress, paymentMethod } = req.body;
    const userId = req.user.id
  
    const requiredFields = { userId, items, totalAmount, shippingAddress, paymentMethod };
    for (const [field, value] of Object.entries(requiredFields)) {
      if (!value) {
        return res.status(400).json({
          success: false,
          message: `Missing required field: ${field}`
        });
      }
    }
    
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Items must be a non-empty array"
      });
    }
  
    for (const item of items) {
      if (!item.productId || !item.name || !item.quantity || !item.price ) {
        return res.status(400).json({
          success: false,
          message: "Each item must have productId, name, quantity, and price"
        });
      }
    }

    const { address, city, postalCode, country } = shippingAddress;
    if (!address || !city || !postalCode || !country) {
      return res.status(400).json({
        success: false,
        message: "Shipping address must include address, city, postalCode, and country"
      });
    }

    const validPaymentMethods = ['Stripe', 'Cash on Delivery'];
    if (!validPaymentMethods.includes(paymentMethod)) {
      return res.status(400).json({
        success: false,
        message: `Invalid payment method. Must be one of: ${validPaymentMethods.join(', ')}` 
      });
    }

    const paymentStatus = paymentMethod === "Cash on Delivery" ? "pending" : "processing";
    const orderStatus = "processing";
    
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

    const itemsWithImages = await Promise.all(items.map(async (item) => {
      const product = await Product.findById(item.productId);
      return {
        ...item,
        image: product?.image || "",
      };
    }));

    const newOrder = new Order({
      userId,
      userName: user.name,
      items: itemsWithImages,
      totalAmount,
      shippingAddress,
      paymentMethod,
      paymentStatus,
      orderStatus
    });

    const savedOrder = await newOrder.save();
    console.log("Saved Order:", savedOrder);


    user.purchaseHistory.push(savedOrder._id);
    await user.save();

    res.status(201).json({
      success: true,
      order: savedOrder
    });

  } catch (error) {
    next(error)
  }
};

// orders of specific user
export const getUserOrders = async (req, res, next) => {
  try {
    const requestedUserId = req.params.userId;

  if (req.user.role !== 'admin' && requestedUserId !== req.user.id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view these orders"
      });
    }

    const orders = await Order.find({ userId: requestedUserId }).sort({ createdAt: -1 }).lean();
    
    const formattedOrders = orders.map(order => ({
      ...order,
      _id: order._id.toString(),
      userId: order.userId.toString(),
      items: order.items.map(item => ({
        ...item,
        _id: item._id?.toString(),
        productId: item.productId?.toString()
      }))
    }));
    
    res.status(200).json({
      success: true,
      count: formattedOrders.length,
      orders: formattedOrders
    });

  } catch (error) {
    next(error)
  }
};


// export const updateOrderPaymentStatus = async (req, res, next) => {
//   const { paymentStatus } = req.body;
//   const { orderId } = req.params;
  
//   const validStatuses = ['pending', 'processing', 'paid', 'failed', 'refunded'];
//   if (!validStatuses.includes(paymentStatus)) {
//     return res.status(400).json({
//       success: false,
//       message: 'Invalid payment status',
//       validStatuses
//     });
//   }
  
//   try {
//     const order = await Order.findById(orderId).populate('userId');  
//     if (!order) {
//       return  next(new Error('Order not found'))
//       ;
//     }

//     if (!req.user || (req.user.role !== 'admin' && order.userId._id?.toString() !== req.user.id.toString())) {
//       return  next(new Error('Not authorized to update this order'))
//     }

//     if (order.paymentStatus === 'paid' && paymentStatus !== 'refunded') {
//       return  next(new Error('Cannot modify status of an already paid order unless refunding'))
//     }

//     if (order.paymentMethod === 'Cash on Delivery' && paymentStatus === 'pending' && order.orderStatus !== 'delivered') {
//       return  next(new Error('Cannot mark COD order as paid before it is delivered'))
//     }

//     if (paymentStatus === 'paid' && order.paymentMethod === 'Cash on Delivery' && order.orderStatus === 'delivered') {
//       order.paymentStatus = 'paid';
//     } else if (paymentStatus !== 'paid') {
//       order.paymentStatus = paymentStatus;
//     }

//     if (paymentStatus === 'paid' && order.paymentMethod === 'Cash on Delivery') {
//       order.orderStatus = 'processing';
//     }

//     await order.save();

//     res.status(200).json({
//       success: true,
//       message: 'Payment status updated successfully',
//       order
//     });

//   } catch (error) {
//     next(error)
//   }
// };

export const updateOrderPaymentStatus = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { paymentStatus } = req.body;

    const order = await Order.findById(orderId).populate('userId');

    if (!order) {
      return next(new Error('Order not found'));
    }

    if (!['paid', 'pending', 'refunded'].includes(paymentStatus)) {
      return next(new Error('Invalid payment status'));
    }

    if (paymentStatus === 'paid') {
      if (order.paymentMethod === 'Cash on Delivery' && order.orderStatus !== 'delivered') {
        return next(new Error('Cannot mark COD order as paid before it is delivered'));
      }

      if (order.paymentStatus === 'paid') {
        return next(new Error('Order is already marked as paid'));
      }

      order.paymentStatus = 'paid';
    } else {
      order.paymentStatus = paymentStatus;
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: 'Payment status updated successfully',
      order,
    });

  } catch (error) {
    next(error);
  }
};




export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).populate('userId', 'name email');

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });

  } catch (error) {
    next(error)
  }
};


export const updateOrderStatus = async (req, res, next) => {
  const { orderId } = req.params;
  const { orderStatus } = req.body;

  const validStatuses = ['processing', 'shipped', 'delivered', 'cancelled'];

  if (!validStatuses.includes(orderStatus)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid order status',
      validStatuses
    });
  }

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    order.orderStatus = orderStatus;
    await order.save();

    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      order
    });

  } catch (error) {
    next(error);
  }
};



export const cancelOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    
    if (req.user.role !== 'admin' && order.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Unauthorized to cancel this order' });
    }
    
    order.orderStatus = 'cancelled';
    await order.save();
    
    res.json({ success: true, order });
  } catch (error) {
    next(error)
  }
}


export const getOrderById = async (req, res, next) => {
  try {
    const { orderId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }
    const order = await Order.findById(orderId).lean()

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
}
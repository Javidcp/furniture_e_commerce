// controllers/webhookController.js
import Stripe from 'stripe';
import Order from '../models/order.js';
import User from '../models/user.js';

const stripe = new Stripe(process.env.STRIPE_SECRET);

export const stripeWebhookHandler = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error("Webhook signature verification failed.", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        // Assuming you passed metadata during session creation (e.g., userId)
        const { userId, shippingData } = session.metadata;

        const items = JSON.parse(session.metadata.items); // You must pass this as JSON string

        const order = new Order({
            userId,
            items,
            totalAmount: session.amount_total / 100,
            shippingAddress: JSON.parse(shippingData),
            paymentStatus: "paid",
            orderStatus: "processing",
        });

        await order.save();
        await User.findByIdAndUpdate(userId, {
            $push: { purchaseHistory: order._id },
            $set: { cart: [] }
        });

        console.log("✅ Order created from Stripe session:", order._id);
    }

    res.json({ received: true });
};

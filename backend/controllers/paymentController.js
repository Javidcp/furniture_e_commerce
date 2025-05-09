import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET);

export const createCheckoutSession = async (req, res, next) => {
    
        const { products, orderId } = req.body;
        
        if (!req.user) {
            return next(new Error("Not authenticated"));
        }
        
        if (!Array.isArray(products) || products.length === 0) {
            return next(new Error("Products must be a non-empty array"));
        }
        
        if (!orderId) {
            return next(new Error("Order ID is required"));
        }
        
        try {
            const line_items = products.map(product => {
                if (!product.name || !product.image || !product.price || !product.quantity) {
                    throw new Error("Each product must have name, image, price, and quantity");
                }
            return {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: product.name,
                        images: [product.image],
                    },
                    unit_amount: Math.round(product.price * 100),
                },
                quantity: product.quantity,
            }
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',            
            success_url: `http://localhost:5173/furniture_e_commerce/#/success/${orderId}`,
            cancel_url: `http://localhost:5173/furniture_e_commerce/#/failed/${orderId}`,
            metadata: { orderId },
            customer_email: req.user.email
        });

        res.json({ id: session.id });

    } catch (error) {
        next(error)
    }
};
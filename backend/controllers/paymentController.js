import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET);

export const createCheckoutSession = async (req, res) => {
    try {
        const { products } = req.body;

        const line_items = products.map(product => ({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: product.name,
                    images: [product.image],
                },
                unit_amount: Math.round(product.price * 100), // cents
            },
            quantity: product.quantity,
        }));
        console.log('Received products:', products);


        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: 'http://localhost:5173/furniture_e_commerce/#/success',
            cancel_url: 'http://localhost:5173/furniture_e_commerce/#/cancel',
        });

        res.json({ id: session.id });

    } catch (error) {
        console.error('Error creating Stripe Checkout Session:', error.message);
        res.status(500).json({ error: 'Failed to create session' });
    }
};


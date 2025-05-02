// // import express from 'express';
// // import { createCheckoutSession } from '../controllers/paymentController.js';

// // const router = express.Router();

// // router.post('/create-checkout-session', createCheckoutSession);

// // export default router;


// import dotenv from "dotenv";
// dotenv.config();
// import express from 'express'
// import Stripe from 'stripe'

// const router = express.Router()
// const stripe = new Stripe(process.env.STRIPE_SECRET);


// router.post('/create-intent', async (req, res) => {
//     const { amount, email } = req.body;
//     try {
//       const paymentIntent = await stripe.paymentIntents.create({
//         amount,
//         currency: 'inr',
//         receipt_email: email,
//       });
  
//       res.json({ clientSecret: paymentIntent.client_secret });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Stripe error' });
//     }
//   });
  
//   export default router;


import express from 'express';
import { createCheckoutSession } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/create-checkout-session', createCheckoutSession);

export default router;

import express from "express";
dotenv.config();
import dotenv from "dotenv";
  import cors from "cors";
  import cookieParser from 'cookie-parser';
  import connectDB from "./config/db.js";
  import authRoutes from "./routes/authRoutes.js";
  import productRoutes from "./routes/productRoute.js"; // Import product routes
  import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
  import wishlistRoute from './routes/wishlistRoute.js'
  import userRoutes from './routes/userRoutes.js'
  import paymentRoutes from './routes/paymentRoutes.js'
  import orderRoutes from "./routes/orderRoutes.js"
  import webhookRoutes from './routes/webhookRoutes.js'

  // Load environment variables

  // Initialize Express app
  const app = express();

  // Database Connection
  connectDB();

  // Middleware Stack
  app.use(express.json()); // Body parser
  app.use(express.urlencoded({ extended: true })); // Form data parsing
  app.use(cookieParser()); // Cookie parser

  // CORS Configuration
  const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
  };

  app.use(cors(corsOptions));


  // API Routes
  app.use('/api/auth', authRoutes);
  app.use('/products', productRoutes);
  app.use('/users', wishlistRoute)
  app.use("/api/user", userRoutes);
  // app.use("/api", paymentRoutes)

  app.use('/api/payment', paymentRoutes);
app.use('/api/orders', orderRoutes);
app.use('/webhook', webhookRoutes);


  // Error Handling Middleware
  app.use(notFound);
  app.use(errorHandler);

  // Server Configuration

  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
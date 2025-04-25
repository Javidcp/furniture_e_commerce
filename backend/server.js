// import express from "express";
// import mongoose from "mongoose";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
// import dotenv from "dotenv";
// import cors from "cors";

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors({
//     origin:"http://localhost:5173/furniture_e_commerce/"
// }));

// // eslint-disable-next-line no-undef
// mongoose.connect(process.env.MONGO_URL)
//     .then(() => console.log("connected successfully"))
//     .catch((err) => console.error(err));

// import { Schema, model } from "mongoose";

// const userSchema = new Schema({
//     name: String,
//     email: { type: String, unique: true },
//     password: String,
//     role: { type: String, default: 'user' },
//     blocked: { type: Boolean, default: false },
//     createdAt: { type: Date, default: Date.now },
//     cart: { type: Array, default: [] },
//     purchaseHistory: { type: Array, default: [] }
// });

// const User = model('User', userSchema);

// // Register Route
// app.post("/api/register", async (req, res) => {
//     try {
//         const { name, email, password } = req.body;
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: "User already exists" });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = new User({ name, email, password: hashedPassword });
//         await newUser.save();

//         res.status(201).json({ message: "User registered successfully" });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server error" });
//     }
// });

// // Login Route
// app.post("/api/login", async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email });
//         console.log(user);
        

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         if (user.blocked) {
//             return res.status(403).json({ message: "Account is blocked" });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({ message: "Invalid credentials" });
//         }

//         // eslint-disable-next-line no-undef
//         const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

//         res.status(200).json({ message: "Login successful", token, user });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server error" });
//     }
// });

// // eslint-disable-next-line no-undef
// app.listen(process.env.PORT, () => {
//     console.log("Running...");
// });



import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import CookieParser from 'cookie-parser';
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(CookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: "GET,HEAD,PUT,POST,PATCH,DELETE"
}));

// Connect to DB
connectDB();

// Routes
app.use("/api", authRoutes);

// Start server
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

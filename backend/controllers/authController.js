import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()


const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );
};


export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    next(err);
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    if (user.blocked) {
      res.status(403);
      throw new Error("Account is blocked");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401);
      throw new Error("Invalid credentials");
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: accessToken
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


export const refreshAccessToken = (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: "No refresh token" });

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid refresh token" });

    const accessToken = generateAccessToken(user);
    res.json({ token: accessToken });
  });
};

export const logoutUser = (req, res) => {
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "Logged out successfully" });
};
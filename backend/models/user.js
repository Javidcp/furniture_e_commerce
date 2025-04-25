import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: 'user' },
  blocked: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  cart: { type: Array, default: [] },
  purchaseHistory: { type: Array, default: [] }
});

const User = mongoose.model("User", userSchema);

export default User;

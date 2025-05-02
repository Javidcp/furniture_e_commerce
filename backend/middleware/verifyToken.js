// middleware/verifyToken.js
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];  // Token from 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: 'No token, access denied!' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;  // Add the user info (e.g., user ID) to the request
    next();  // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(400).json({ message: 'Invalid token!' });
  }
};

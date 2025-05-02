// middleware/verifyAdmin.js
export const verifyAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {  // Check if the user is an admin
      return next();  // Allow access if the user is an admin
    } else {
      return res.status(403).json({ message: 'Access denied, Admins only!' });
    }
  };
  
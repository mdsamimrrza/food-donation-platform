import jwt from 'jsonwebtoken';

const donationMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Get token from Authorization header
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token using the same secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decoded.userId }; // Attach user data to the request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Token Verification Error:', error.message);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default donationMiddleware;

import jwt from 'jsonwebtoken';

const donationMiddleware = (req, res, next) => {
  const token = req.cookies.authToken; 
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decoded.userId, role: decoded.role, email: decoded.email }; // Attach user info to the request
    console.log("Decoded user from token:", req.user);
    next(); 
  } catch (error) {
    console.error('Token Verification Error:', error.message);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default donationMiddleware;

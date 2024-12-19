import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  // Access token from cookies
  const token = req.cookies.authToken; // Use req.cookies to access cookies

  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  console.log('Received Token:', token);
  console.log('JWT_SECRET:', process.env.JWT_SECRET);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded);
    req.user = { userId: decoded.userId }; // Attach user info to request
    next(); 
  } catch (error) {
    console.error('Token Verification Error:', error.message);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default authMiddleware;

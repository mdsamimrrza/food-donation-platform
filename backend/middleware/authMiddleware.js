import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token missing or malformed' });
  }

  const token = authHeader.split(' ')[1];
  console.log('Received Token:', token);
  console.log('JWT_SECRET:', process.env.JWT_SECRET);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded);
    req.user = { userId: decoded.userId }; // Attach user info
    next();
  } catch (error) {
    console.error('Token Verification Error:', error.message);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default authMiddleware;

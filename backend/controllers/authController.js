import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';  

export const register = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const validRoles = ['donor', 'receiver', 'admin'];
    if (role && !validRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role provided' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || 'donor', 
    });

    await newUser.save();

 const token = jwt.sign(
  { userId: newUser._id, role: newUser.role, email: newUser.email }, 
  process.env.JWT_SECRET,
  { expiresIn: '1h' }  
);


    res.status(201).json({ token, message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
     console.log('User found:', user);
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

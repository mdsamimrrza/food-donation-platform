// userController.mjs

import User from '../models/User.model.js';  // Assuming you have a User model

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);  // Assuming userId is added to the request after authentication
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  const { username, email } = req.body;

  try {
    const user = await User.findById(req.userId);  // Assuming userId is added to the request after authentication
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.username = username || user.username;
    user.email = email || user.email;

    await user.save();

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

import User from '../models/User.model.js';  

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);  
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updateUserProfile = async (req, res) => {
  const { username, email } = req.body;

  try {
    const user = await User.findById(req.userId); 
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

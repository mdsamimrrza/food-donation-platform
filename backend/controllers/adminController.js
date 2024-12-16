import Donation from '../models/Donation.model.js'; 
import User from '../models/User.model.js';         

export const getDonors = async (req, res) => {
  try {
    const donors = await User.find({ role: 'donor' }); 
    res.status(200).json({ donors });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getReceivers = async (req, res) => {
  try {
    const receivers = await User.find({ role: 'receiver' }); 
    res.status(200).json({ receivers });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const manageDonations = async (req, res) => {
  const { status } = req.body;

  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    donation.status = status || donation.status;
    await donation.save();

    res.status(200).json({ message: 'Donation managed successfully', donation });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

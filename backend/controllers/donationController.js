import Donation from '../models/Donation.model.js'; 
import donationMiddleware from '../middleware/donationMiddleware.js';

export const createDonation = async (req, res) => {
  const { title, description, quantity, location, receiverId } = req.body;
console.log('Token Payload:', { userId: user._id, role: user.role, email: user.email });

  try {
    const newDonation = new Donation({
      title,
      description,
      quantity,
      location,
      donor: req.user.userId, // The userId from the token
      receiver: receiverId || null,
      status: 'Pending',
    });

    await newDonation.save();

    res.status(201).json({
      message: 'Donation created successfully',
      donation: newDonation,
    });
  } catch (error) {
    console.error('Error saving donation:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};


export const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find();
    res.status(200).json({ donations });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updateDonationStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    donation.status = status || donation.status;
    await donation.save();

    res.status(200).json({ message: 'Donation status updated', donation });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

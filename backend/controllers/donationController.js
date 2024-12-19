import Donation from '../models/Donation.model.js';

export const createDonation = async (req, res) => {
  console.log("Create Donation");
  
  const { title, description, quantity, location, receiverId } = req.body;

  try {
    const donor = req.user?.userId; 

    if (!donor) {
      return res.status(401).json({ message: 'Unauthorized: Donor information is missing' });
    }

    const newDonation = new Donation({
      title,
      description,
      quantity,
      location,
      donor,
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

    if (donation.donor.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'You are not authorized to update this donation' });
    }

    donation.status = status || donation.status;
    await donation.save();

    res.status(200).json({ message: 'Donation status updated', donation });
  } catch (error) {
    console.error('Error updating donation:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

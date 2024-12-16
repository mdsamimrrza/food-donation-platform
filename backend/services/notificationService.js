// services/donationService.js

import Donation from '../models/Donation.js';

// Create a new donation
export const createDonation = async (donationData) => {
  const { item, quantity, location, donorId } = donationData;

  const donation = new Donation({
    item,
    quantity,
    location,
    donor: donorId,
    status: 'Pending',
  });

  await donation.save();
  return donation;
};

// Get donations by donor
export const getDonationsByDonor = async (donorId) => {
  try {
    const donations = await Donation.find({ donor: donorId });
    return donations;
  } catch (error) {
    throw new Error('Error fetching donations by donor: ' + error.message);
  }
};

// Get all donations
export const getAllDonations = async () => {
  try {
    const donations = await Donation.find();
    return donations;
  } catch (error) {
    throw new Error('Error fetching donations: ' + error.message);
  }
};

// Update donation status
export const updateDonationStatus = async (donationId, status) => {
  try {
    const donation = await Donation.findByIdAndUpdate(donationId, { status }, { new: true });
    return donation;
  } catch (error) {
    throw new Error('Error updating donation status: ' + error.message);
  }
};

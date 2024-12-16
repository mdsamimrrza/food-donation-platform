import User from "../models/User";
import Donation  from  "../models/Donation";

// Get all donors
const getDonors = async () => {
  try {
    // Find all users with the role of 'donor'
    const donors = await User.find({ role: "donor" });
    return donors;
  } catch (error) {
    throw new Error("Error fetching donors: " + error.message);
  }
};

// Get all receivers
const getReceivers = async () => {
  try {
    // Find all users with the role of 'receiver'
    const receivers = await User.find({ role: "receiver" });
    return receivers;
  } catch (error) {
    throw new Error("Error fetching receivers: " + error.message);
  }
};

// Get all donations with their status
const getAllDonations = async () => {
  try {
    // Fetch all donations
    const donations = await Donation.find().populate("donor receiver");
    return donations;
  } catch (error) {
    throw new Error("Error fetching donations: " + error.message);
  }
};

// Update donation status (for admin)
const manageDonationStatus = async (donationId, status) => {
  try {
    // Validate the status
    const validStatuses = ["Pending", "Accepted", "Completed", "Rejected"];
    if (!validStatuses.includes(status)) {
      throw new Error("Invalid donation status");
    }

    // Find the donation and update its status
    const donation = await Donation.findByIdAndUpdate(
      donationId,
      { status },
      { new: true }
    );

    if (!donation) {
      throw new Error("Donation not found");
    }

    return donation;
  } catch (error) {
    throw new Error("Error updating donation status: " + error.message);
  }
};

// Delete a donation (for admin)
const deleteDonation = async (donationId) => {
  try {
    // Find and delete the donation
    const donation = await Donation.findByIdAndDelete(donationId);

    if (!donation) {
      throw new Error("Donation not found");
    }

    return { message: "Donation deleted successfully" };
  } catch (error) {
    throw new Error("Error deleting donation: " + error.message);
  }
};

module.exports = {
  getDonors,
  getReceivers,
  getAllDonations,
  manageDonationStatus,
  deleteDonation,
};

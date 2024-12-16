import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Completed'],
    default: 'Pending',
  },
}, {
  timestamps: true,
});

const Donation = mongoose.model('Donation', donationSchema);

export default Donation;

import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  permissions: {
    type: [String],  // List of permissions for the admin
    default: ['manage_users', 'manage_donations'],
  },
}, {
  timestamps: true,  // Automatically adds createdAt and updatedAt fields
});

// Create an Admin model based on the schema
const Admin = mongoose.model('Admin', adminSchema);

export default Admin;

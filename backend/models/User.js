const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  address1: { type: String },
  address2: { type: String },
  city: { type: String },
  postalCode: { type: String },
  country: { type: String },
  phoneNumber: { type: String },
  email: { type: String, unique: true, required: true },
  userNotes: { type: String },
  password: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
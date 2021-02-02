const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  createdAt: {type: Date, default: Date.now},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  mobileNumber: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  username: {type: String, required: true, unique: true},
  password: String,
  userType: {type: String, required: true},
  photoUrl: String,
  licenseType: String,
  licenseNumber: String,
  licenseExpiry: Date,
  address: String,
})

module.exports = mongoose.model('User', UserSchema)

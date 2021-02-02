const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  createdAt: {type: String, default: Date.now},
  weight: Number,
  volume: Number,
  class: String,
  code: String,
  plateNumber: String,
  homeAddress: String,
  imageUrl: String,
  iconUrl: String,
  currentLocation: {
    lat: Number,
    lng: Number
  },
  locationAddress: String,
  atHome: {type: Boolean, default: true},
  status: {type: String, default: 'active'},
  stats: {
    accidents: Number,
    repairs: Number,
    mileage: Number,
    lastService: Date
  }
})

module.exports = mongoose.model('Vehicle', VehicleSchema)

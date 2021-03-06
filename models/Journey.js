const mongoose = require('mongoose')

const JourneySchema = new mongoose.Schema({
  createdAt: {type: String, default: Date.now},
  origin: {type: String, required: true},
  startDate: Date,
  endDate: Date,
  originGeoCode: {
    lat: Number,
    lng: Number
  },
  destination: {type: String, required: true},
  destinationGeoCode: {
    lat: Number,
    lng: Number
  },
  instruction: {type: String, required: true},
  status: {type:String, default:'pending'},
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle'
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  trackingGeoCode:[{
    lat: Number,
    lng: Number
  }]
})

module.exports = mongoose.model('Journey', JourneySchema)

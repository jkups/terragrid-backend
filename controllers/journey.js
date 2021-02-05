const Journey = require('../models/Journey')
const nodeGeocoder = require('node-geocoder')
const geoCoderOptions = {provider: 'openstreetmap'}
const geocoder = nodeGeocoder(geoCoderOptions)

module.exports = {
  async getJourneys(req, res){
    try{
      const journey = await Journey.find().populate('vehicle').populate('driver')

      res.json(journey)
    } catch (e){
      console.log(e);
    }
  },
  async updateJourney(req, res){
    try{
      await Journey.findByIdAndUpdate(req.params.id, req.body)
      res.json({success: true})
    }catch(e){
      console.log(e);
      res.json({success: false})
    }
  },
  async saveJourney(req, res){
    try{
      console.log(req.body);
      const journey = req.body
      console.log(req.body)
      const originGeoCode = await geocoder.geocode(req.body.origin)
      const destinationGeoCode = await geocoder.geocode(req.body.destination)
      console.log(originGeoCode);
      journey.originGeoCode = {
        lat: originGeoCode[0].latitude,
        lng: originGeoCode[0].longitude
      }

      journey.destinationGeoCode = {
        lat: destinationGeoCode[0].latitude,
        lng: destinationGeoCode[0].longitude
      }

      await Journey.create(journey)
      res.json({success: true})
    }catch(e){
      console.log(e);
      res.json({success: false})
    }
  },
  async getJourneyByVehicle(req, res){
    try{
      const journeys = await Journey.find({vehicle: req.params.id}).populate('driver').select('-__v')
      res.json(journeys)
    }catch(e){
      console.log(e);
    }
  },
  async getJourneyByDriver(req, res){
    // console.log(req.params);
    try{
      const journey = await Journey.find({driver: req.params.id}).populate('driver').populate('vehicle').select('-__v')
      res.json(journey)
    }catch(e){
      console.log(e);
    }
  },
  async getJourneyById(id){
    try{
      journey = await Journey.findById(id)
      return journey
    }catch(e){
      console.log(e);
    }
  }
}

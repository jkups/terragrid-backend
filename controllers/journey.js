const Journey = require('../models/Journey')
const User = require('../models/User')
const Vehicle = require('../models/Vehicle')

module.exports = {
  async getJourneys(req, res){
    try{
      const journey = await Journey.find().populate('vehicle').populate('driver')

      res.json(journey)
    } catch (e){
      console.log(e);
    }
  },
  async saveJourney(req, res){
    try{
    }catch(e){

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
  }
}

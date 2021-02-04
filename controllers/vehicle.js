const Vehicles = require('../models/Vehicles')

module.exports = {
  async getVehicles(req, res){
    try{
      const vehicles = await Vehicle.find().select('-__v')
      res.json(vehicles)
    }catch(e){
      console.log(e);
      res.json({success: false})
    }
  },
  async saveVehicle(req, res){
    try{
      const [{ latitude, longitude }] = await geocoder.geocode(req.body.homeAddress)

      const vehicle = {
        ...req.body,
        locationAddress: req.body.homeAddress,
        currentLocation: {lat: latitude, lng: longitude}
      }

      await Vehicle.create(vehicle)
      res.json({success: true})
    }catch(e){
      console.log(e);
      res.json({success: false})
    }
  },
  async getVehicleById(req, res) => {
    try{
      const vehicle = await Vehicle.findOne({_id: req.params.id}).select('-_id -__v')
      res.json(vehicle)
    }catch(e){
      console.log(e);
      res.json({success: false})
    }
  },
  async updateVehicle(req, res){
    try{
      await Vehicle.findByIdAndUpdate(req.params.id, req.body)
      res.json({success: true})
    }catch(e){
      console.log(e);
      res.json({success: false})
    }
  }
}

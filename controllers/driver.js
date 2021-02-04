const User = require('../models/User')

module.exports = {
  async getDrivers(req, res){
    try{
      const drivers = await User.find({userType: 'driver'}).select('-__v')
      res.json(drivers)
    }catch(e){
      console.log(e);
      res.json({success: false})
    }
  },
  async saveDriver(req, res){
    try{
      const driver = {...req.body, userType: 'driver', username: req.body.email}
      await User.create(driver)
      res.json({success: true})
    }catch(e){
      console.log(e);
      res.json({success: false})
    }
  },
  async getDriverById(req, res){
    try{
      const driver = await User.findOne({_id: req.params.id}).select('-_id -__v')
      res.json(driver)
    }catch(e){
      console.log(e);
      res.json({success: false})
    }
  },
  async updateDriver(req, res){
    try{
      await User.findByIdAndUpdate(req.params.id, req.body)
      res.json({success: true})
    }catch(e){
      console.log(e);
      res.json({success: false})
    }
  },

}

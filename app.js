const mongoose = require('mongoose');
const express = require('express');
const app =  express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtAuthenticate = require('express-jwt')

const SERVER_SECRET_KEY = 'yourSecretKeyHereCHICKEN'



mongoose.connect('mongodb://localhost/terra',
{ useNewUrlParser: true, useUnifiedTopology: true})


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const Journey = require('./models/Journey')
const Vehicle = require('./models/Vehicle')
const User = require('./models/User')


const nodeGeocoder = require('node-geocoder')
const geoCoderOptions = {
  provider: 'openstreetmap',
  apiKey: 'AIzaSyC92A27W3HNJ_kxea2POCviAfhVHsIknso'
}

const geocoder = nodeGeocoder(geoCoderOptions)
geocoder.geocode('16 Staghorn Terrace, Point Cook')
.then(res => {
  console.log(res);
})

//==========================

const checkAuth = () => {
  return jwtAuthenticate({
    secret: SERVER_SECRET_KEY,
    algorithms: ['HS256']
  })
}

const isAuthorized = () => {

}

app.post('/login', async (req, res) => {
  try{
    console.log(req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    console.log(user);
    if(user && bcrypt.compareSync(password, user.password)){
      const token = jwt.sign({
        _id: user._id,
        userType: user.userType,
        email: user.email,
        name: user.firstName + ' ' + user.lastName
      },
      SERVER_SECRET_KEY,
      { expiresIn: '72h' })

      res.json({success:true, user, token })
    } else {
      res.sendStatus(401)
    }

  }catch(err){
    console.log('Login error', req.body, err);
    res.sendStatus(500)
  }
})

//=======================

app.get('/journeys', checkAuth(), isAuthorized, async (req, res) => {
  try{
    const journey = await Journey.find().populate('vehicle').populate('driver')

    res.json(journey)
  } catch (e){
    console.log(e);
  }
})

// =========================
app.get('/drivers', checkAuth(), isAuthorized, async (req, res) => {
  try{
    const drivers = await User.find({userType: 'driver'}).select('-__v')
    res.json(drivers)
  }catch(e){
    console.log(e);
    res.json({success: false})
  }
})

app.post('/drivers', checkAuth(), isAuthorized, async (req, res) => {
  // console.log(req.body);
  try{
    const driver = {...req.body, userType: 'driver', username: req.body.email}
    await User.create(driver)
    res.json({success: true})
  }catch(e){
    console.log(e);
    res.json({success: false})
  }
})

app.get('/drivers/:id', checkAuth(), isAuthorized, async (req, res) => {
  try{
    const driver = await User.findOne({_id: req.params.id}).select('-_id -__v')
    res.json(driver)
  }catch(e){
    console.log(e);
    res.json({success: false})
  }
})

app.put('/drivers/:id', checkAuth(), isAuthorized, async (req, res) => {
  try{
    await User.findByIdAndUpdate(req.params.id, req.body)
    res.json({success: true})
  }catch(e){
    console.log(e);
    res.json({success: false})
  }
})

// ==============================
app.get('/vehicles', checkAuth(), isAuthorized, async (req, res) => {
  try{
    const vehicles = await Vehicle.find().select('-__v')
    res.json(vehicles)
  }catch(e){
    console.log(e);
    res.json({success: false})
  }
})

app.post('/vehicles', checkAuth(), isAuthorized, async (req, res) => {
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
})

app.get('/vehicles/:id', checkAuth(), isAuthorized, async (req, res) => {
  try{
    const vehicle = await Vehicle.findOne({_id: req.params.id}).select('-_id -__v')
    res.json(vehicle)
  }catch(e){
    console.log(e);
    res.json({success: false})
  }
})

app.put('/vehicles/:id', checkAuth(), isAuthorized, async (req, res) => {
  try{
    await Vehicle.findByIdAndUpdate(req.params.id, req.body)
    res.json({success: true})
  }catch(e){
    console.log(e);
    res.json({success: false})
  }
})


app.use( (err, req, res, next) => {
  if( err.name === 'UnauthorizedError'){
    console.log('Unauthorized request', req.path);
    res.status(401).json({error: 'Invalid token'})

  } else {

    // console.log('failed request');
    res.sendStatus(404)
  }
})


app.listen(8000, () => {
  console.log('Now serving at http://localhost:8000');
})

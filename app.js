require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express');
const app =  express();
const cors = require('cors');

const jwtAuthenticate = require('express-jwt')
const auth = require('./controllers/auth')
const journey = require('./controllers/journey')
const vehicle = require('./controllers/vehicle')
const driver = require('./controllers/driver')

mongoose.connect(process.env.DB_URL,
{ useNewUrlParser: true, useUnifiedTopology: true})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//geo coder
const nodeGeocoder = require('node-geocoder')
const geoCoderOptions = {
  provider: 'openstreetmap',
}

const geocoder = nodeGeocoder(geoCoderOptions)
geocoder.geocode('16 Staghorn Terrace, Point Cook')
.then(res => {
  console.log(res);
})

//JWT and authentication
const checkAuth = () => {
  return jwtAuthenticate({
    secret: process.env.SERVER_SECRET,
    algorithms: ['HS256']
  })
}

app.post('/login', auth.login)


//journey routes
app.get('/journeys', checkAuth(), journey.getJourneys)
app.post('/journeys', checkAuth(), journey.saveJourney)
app.get('/journeys/vehicle/:id', checkAuth(), journey.getJourneyByVehicle)
app.get('/journeys/driver/:id', checkAuth(), journey.getJourneyByDriver)


//driver routes
app.get('/drivers', checkAuth(), driver.getDrivers)
app.post('/drivers', checkAuth(), driver.saveDriver)
app.get('/drivers/:id', checkAuth(), driver.getDriverById)
app.put('/drivers/:id', checkAuth(), driver.updateDriver)

//vehicle routes
app.get('/vehicles', checkAuth(), vehicle.getVehicles)
app.post('/vehicles', checkAuth(), vehicle.saveVehicle)
app.get('/vehicles/:id', checkAuth(), vehicle.getVehicleById)
app.put('/vehicles/:id', checkAuth(), vehicle.updateVehicle)


//error handling route
app.use( (err, req, res, next) => {
  if( err.name === 'UnauthorizedError'){
    console.log('Unauthorized request', req.path);
    res.status(401).json({error: 'Invalid token'})
  } else {
    res.sendStatus(404)
  }
})

app.listen(process.env.PORT, process.env.IP, () => {
  console.log('Now serving your page!');
})

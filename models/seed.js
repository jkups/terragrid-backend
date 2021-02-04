require('dotenv').config()
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./User');
const Vehicle = require('./Vehicle');
const Journey = require('./Journey');

mongoose.connect('mongodb://localhost/terra',
{ useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection
db.on('error', (err) => {
  console.log('Connection error', err);
})

db.once('open', async () => {

  await User.deleteMany({})
  const users = await User.create([
    {
      firstName: 'John',
      lastName: 'Grouch',
      mobileNumber: '+61487505416',
      email: 'john@gmail.com',
      username: 'jkups',
      password: bcrypt.hashSync('chicken', 10),
      userType: 'user'
    },
    {
      firstName: 'Thomas',
      lastName: 'Hills',
      mobileNumber: '+6148489492',
      email: 'thomas@gmail.com',
      username: 'thmas',
      password: bcrypt.hashSync('chicken', 10),
      userType: 'driver',
      photoUrl: 'avataaars-12_ohgwrs.png',
      licenseType: 'Driver License',
      licenseNumber: 'A2394774LN',
      licenseExpiry: '2023/02/31',
      address: '34 Yuruga Avenue, Melbourne',
      status: 'assigned'
    },
    {
      firstName: 'Jacob',
      lastName: 'Rocky',
      mobileNumber: '+61397274342',
      email: 'jacob@gmail.com',
      username: 'rocky',
      password: bcrypt.hashSync('chicken', 10),
      userType: 'driver',
      photoUrl: 'avataaars-12_ohgwrs.png',
      licenseType: 'Driver License',
      licenseNumber: 'A2394584LN',
      licenseExpiry: '2022/06/15',
      address: '34 Yuruga Avenue, Melbourne',
      status: 'assigned'
    },
    {
      firstName: 'Andria',
      lastName: 'Romenose',
      mobileNumber: '+6148489492',
      email: 'andria@gmail.com',
      username: 'andy',
      password: bcrypt.hashSync('chicken', 10),
      userType: 'driver',
      photoUrl: 'avataaars-12_ohgwrs.png',
      licenseType: 'Driver License',
      licenseNumber: 'A8956234LN',
      licenseExpiry: '2020/02/6',
      address: '34 Yuruga Avenue, Melbourne',
      status: 'unassigned'
    },
    {
      firstName: 'Melinda',
      lastName: 'Brown',
      mobileNumber: '+6109723731',
      email: 'melinda@gmail.com',
      username: 'milly',
      password: bcrypt.hashSync('chicken', 10),
      userType: 'admin'
    },

  ])

  console.log('first user:', users[0]);
  console.log(`Created ${users.length} users.`);
  console.log('-------------------------------');

  await Vehicle.deleteMany({})
  const vehicles = await Vehicle.create([
    {
      weight: 6803,
      volume: 45,
      class: 'Class 6',
      code: 'A32',
      plateNumber: 'VL34ML',
      homeAddress: 'Staghorn Terrace, Point Cook',
      locationAddress: 'Staghorn Terrace, Point Cook',
      currentLocation: {
        lat: -37.90601,
        lng: 144.7467814
      },
      status: 'active',
      stats: {
        accidents: 0,
        repairs: 5,
        mileage: 25000,
        lastService: '2021/01/31'
      }
    },
    {
      weight: 7500,
      volume: 65,
      class: 'Class 8',
      code: 'B54',
      plateNumber: 'B897HJ',
      homeAddress: 'Staghorn Terrace, Point Cook',
      locationAddress: 'Staghorn Terrace, Point Cook',
      currentLocation: {
        lat: -37.90601,
        lng: 144.7467814
      },
      status: 'active',
      stats: {
        accidents: 0,
        repairs: 0,
        mileage: 15000,
        lastService: '2021/01/31'
      }
    },
    {
      weight: 9856,
      volume: 80,
      class: 'Class 8',
      code: 'B76',
      plateNumber: 'H89UY',
      homeAddress: 'Staghorn Terrace, Point Cook',
      locationAddress: 'Staghorn Terrace, Point Cook',
      currentLocation: {
        lat: -37.90601,
        lng: 144.7467814
      },
      stats: {
        accidents: 2,
        repairs: 10,
        mileage: 350000,
        lastService: '2021/01/31'
      }
    }
  ])

  console.log('first vehicle:',vehicles[0]);
  console.log(`Created ${vehicles.length} vehicles.`);
  console.log('-------------------------------');

  await Journey.deleteMany({})
  journeys = await Journey.create([
    {
      origin: 'Staghorn Terrace, Point Cook Victoria',
      startDate: new Date(),
      endDate: new Date(),
      originGeoCode: {
        lat: -37.90601,
        lng: 144.7467814,
      },
      destination: 'La Trobe Street, Melbourne Victoria',
      destinationGeoCode: {
        lat: -37.926897,
        lng: 144.6345
      },
      instruction: 'Pick up goods from Point Cook to deliver at La Trobe.',
      status: 'scheduled',
      vehicle: vehicles[0].id,
      driver: users[1].id
    },
    {
      origin: 'Saltwater Kirra Place Point Cook Victoria',
      startDate: new Date(),
      endDate: new Date(),
      originGeoCode: {
        lat: -37.9117457,
        lng: 144.7699707,
      },
      destination: 'Synnot St, Werribee Victoria',
      destinationGeoCode: {
        lat: -37.903660,
        lng: 144.65969
      },
      instruction: 'Pick up goods from Saltwater to deliver at Synnot Werribee',
      status: 'scheduled',
      vehicle: vehicles[1].id,
      driver: users[2].id
    }
  ])

  console.log('first journey:', journeys[0]);
  console.log(`Created ${journeys.length} journeys.`);
  console.log('-------------------------------');


  process.exit(0)
})

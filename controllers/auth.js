const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = {
  async login(req, res){
    try{
      const { email, password } = req.body;
      const user = await User.findOne({ email })

      if(user && bcrypt.compareSync(password, user.password)){
        const token = jwt.sign({
          _id: user._id,
          userType: user.userType,
          email: user.email,
          name: user.firstName + ' ' + user.lastName
        },
         process.env.SERVER_SECRET,
        { expiresIn: '72h' })

        res.json({success:true, user, token })
      } else {
        res.sendStatus(401)
      }

    }catch(err){
      console.log('Login error', req.body, err);
      res.sendStatus(500)
    }
  }
}

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const auth = require('../../middleware/auth');

const User = require('../../models/User')
const Profile = require('../../models/Profile')

// @router POST api/users
// @desc Register User
// @access Public
router.post('/', [
  check('username', 'Username is required (More than 3 characters)').not().isEmpty().isLength({ min: 3}),
  check('email', 'Write a valid email').isEmail(),
  check('password', 'You need a secure password (more than 8 characters)').isLength({ min: 8})
], async (req, res) => {

  // Variable takes errors from ValidationResult
  const errors = validationResult(req);

  //If there are errors, show a message
  if (!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() });
  }

  // This breaks down the req.body (data received)
  const {username, email, password} = req.body;

  try {
    // Finding registered emails
    let userEmail = await User.findOne({email})
    if (userEmail) {
      return  res.status(400).json({ errors: [{msg: 'Email is already registered'}]})
    }

    let findUserinUser = await User.findOne({username})

    let findUserinProfile = await Profile.findOne({username})

    if (findUserinUser || findUserinProfile) {
      return  res.status(400).json({ errors: [{msg: 'Username is already in use'}]})
    }

    // Breaking down user
    user = new User({
      username,
      email,
      password
    });

    profile = new Profile({
      username
    });

    try {
    const profileUsername = {
      user: user.id,
      username: username
    };

    let profile = await Profile.findOneAndUpdate(
      { user: user.id },
      { $set: profileUsername },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    } catch(err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
    //Hashing the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    // Bringing the USER.ID as payload
    const payload = {
      user: {
        id: user.id
      }
    };

    //Sending the JWT token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {expiresIn: 360000},
      (err, token) => {
      if(err) throw err;
      res.json({ token })
    });

  } catch(err) {

    console.log(err.message);
    res.status(500).send('Registering Error');
  }
});

module.exports = router;

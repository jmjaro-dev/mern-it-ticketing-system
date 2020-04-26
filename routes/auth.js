const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route   GET api/auth
// @desc    Get Logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // Gets the user that matches the id and returns info of the user w/o the password
    const user = await User.findById(req.user.id).select('-isActive');
    // return user object as the response
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST  api/auth
// @desc    Auth user & get token
// @access  Public
router.post('/', [
  check('email', 'Please enter a valid email').isEmail(),
  check('password', 'Password is required').exists()
], async (req, res) => {
  const errors = validationResult(req);
  
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    // Check if user exists
    if(!user) {
      return res.status(400).json({ msg: 'User doesn\'t exists' });
    }

    // If user exists then compare password
    const isMatch = await bcrypt.compare(password, user.password);

    // If passwords doesn't match then return status 400
    if(!isMatch) {
      return res.status(400).json({ msg: 'Incorrect password' });
    }

    // User Payload
    const payload = { 
      user: {
        id: user.id
      }
    }
    
    // Generate JWT Token
    jwt.sign(payload, config.get('jwtSecret'), {
      expiresIn: 360000
    }, (err, token) => {
      if(err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
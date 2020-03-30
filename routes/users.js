const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route   GET api/users
// @desc    Get all users
// @access  Private
router.get('/', auth, async (req,res) => {
  try {
    // Gets all users and sort by date
    const users = await User.find().sort({ _id: '-1' });
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/users/techs
// @desc    Get all technician users
// @access  Private
router.get('/techs', auth, async (req,res) => {
  try {
    // Gets all techs and sort by id
    const techs = await User.find({ userType: 'technician'}).select('-isActive -password -email -createdAt -updatedAt -userType').sort({ _id: '-1' });
    res.json(techs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/', [  
  check('firstName', 'Please enter first name').not().isEmpty(),
  check('lastName', 'Please enter last name').not().isEmpty(),
  check('email', 'Please enter a valid email').isEmail(),
  check('password', 'Password must be > 6 characters.').isLength({ min: 6 }),
  check('userType', 'Please select user type').not().isEmpty()
  ] , async (req,res) => {
  const errors = validationResult(req);

  // If there are errors in validation
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, email, password, userType } = req.body;
    
  try {
    // Finds a user that is using the 'email'
    let user = await User.findOne({ email });

    // Checks if that user exists
    if(user) {
      return res.status(400).json({ msg: 'User already exists.' });
    }

    // If user doesn't exist
    user = new User({
      firstName,
      lastName,
      email,
      password,
      userType
    });

    // Generate salt for password
    const salt = await bcrypt.genSalt(12);
    // Hash the password
    user.password = await bcrypt.hash(password, salt);
    // Save user to database
    await user.save();

    // User Payload for Token
    const payload = {
      user: {
        id: user.id
      }
    }

    // Generate JWT Token
    jwt.sign(payload, config.get('jwtSecret'), {
      expiresIn: 360000
    }, (err, token) => {
      // Throws error if there are errors
      if(err) throw err;
      // Sends back the token
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/users
// @desc    Update user's first and last name
// @access  Private
router.put('/:id', [ auth, [
  check('firstName', 'Please enter first name').not().isEmpty(),
  check('lastName', 'Please enter last name').not().isEmpty()
  ] ], async (req,res) => {
  const errors = validationResult(req);

  // If there are errors in validation
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Destructure firstName and lastName
  const { firstName, lastName } = req.body;

  // Build updated user object 
  const userFields = {};
  if(firstName) userFields.firstName = firstName;
  if(lastName) userFields.lastName = lastName;

  try {
    // Find user that matches the id
    let user = await User.findById(req.params.id);

    // If user does not exists
    if(!user) {
      return res.status(404).json({ msg: 'User not found' });
    } 
    else {
      user = await User.findByIdAndUpdate(req.params.id, { $set: userFields }, { new: true });
      res.json(user);
    } 
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/users
// @desc    Delete a user
// @access  Private
router.delete('/:id', auth, async (req,res) => {
  try {
    // Find the user by id
    let user = await User.findById(req.params.id) 

    if(!user) {
      return res.status(404).json({ msg: 'User not found' });
    } else {
      await User.findByIdAndDelete(req.params.id);

      res.json({ msg: 'User deleted' });
    }
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
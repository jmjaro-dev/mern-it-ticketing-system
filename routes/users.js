const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Ticket = require('../models/Ticket');
const Comment = require('../models/Comment');

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

// @route   PUT api/users/update/email/:id
// @desc    Update user's email
// @access  Private
router.put('/update/email/:id', [ auth, [
  check('email', 'Please enter a valid email').isEmail()
  ] ], async (req,res) => {
  const errors = validationResult(req);

  // If there are errors in validation
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Destructure email
  const { email } = req.body;

  const emailField = { email };

  try {
    // Find user that matches the id
    let user = await User.findOne().where({ email: email });

    // If user does not exists
    if(user) {
      return res.status(404).json({ msg: 'Email is already taken by another user.' });
    } 
    else {
      // Update the email in Users database
      let updated_user = await User.findByIdAndUpdate(req.params.id, { $set: emailField }, { new: true }).select('-password -isActive');
      res.json(updated_user);
    } 
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/users/update/password/:id
// @desc    Update user's Password
// @access  Private
router.put('/update/password/:id', [ auth, [
  check('currentPassword', 'Password must be > 6 characters.').isLength({ min: 6 }),
  check('newPassword', 'Password must be > 6 characters.').isLength({ min: 6 })
  ] ], async (req,res) => {
  const errors = validationResult(req);

  // If there are errors in validation
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Destructure password
  const { currentPassword, newPassword } = req.body;

  // Find user that matches the id
  let user = await User.findById(req.params.id);

  try {
    // If user exists then compare user input password to current password in database
    let isMatch = await bcrypt.compare(currentPassword, user.password);

    // If passwords doesn't match then update password
    if(!isMatch) {
      return res.status(400).json({ msg: 'Current password is incorrect. Please try again.' });
    } else {
      // Generate salt for new password
      const salt = await bcrypt.genSalt(12);

      // Hash the new password
      const updatedPassword = await bcrypt.hash(newPassword, salt);

      const passwordField = { password: updatedPassword };
      
      // Update the password in Users database
      await User.findByIdAndUpdate(req.params.id, { $set: passwordField }, { new: true });
      res.json({ msg: 'success'});
    }
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
      // Update Info in Users database
      user = await User.findByIdAndUpdate(req.params.id, { $set: userFields }, { new: true });
      res.json(user);
    } 
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route   PUT api/users/tickets/:user_id
// @desc    Update user's first and last name in Tickets Table
// @access  Private
router.put('/tickets/:id', [ auth, [
  check('firstName', 'Please enter first name').not().isEmpty(),
  check('lastName', 'Please enter last name').not().isEmpty()
  ] ], async (req,res) => {
  const errors = validationResult(req);

  // If there are errors in validation
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Destructure firstName and lastName
  const { firstName, lastName, userType } = req.body;

  // Build updated user object 
  let userFields;
  
  // Check userType then create the appropriate object structure
  if(userType === 'employee') {
    // user === 'employee'
    userFields = {
      issuedBy: {
        _id: '',
        firstName: '',
        lastName: ''
      }
    };

    userFields.issuedBy._id = req.params.id;
    if(firstName) userFields.issuedBy.firstName = firstName;
    if(lastName) userFields.issuedBy.lastName = lastName;
  } 
  
  if(userType === 'technician') {
    // user === 'technician'
    userFields = {
      assignedTo: {
        _id: '',
        firstName: '',
        lastName: ''
      }
    };

    userFields.assignedTo._id = req.params.id;
    if(firstName) userFields.assignedTo.firstName = firstName;
    if(lastName) userFields.assignedTo.lastName = lastName;
  }
  
  try {
    // Find user that matches the id
    let user = await User.findById(req.params.id);

    // If user does not exists
    if(!user) {
      return res.status(404).json({ msg: 'User not found' });
    } 
    else {
      // Update User's Info in Tickets database
      if(userType === 'employee') {
        // IF user === 'employee' THEN update 'issuedBy' field
        Ticket.find().where({ 'issuedBy._id': req.params.id })
        .then(tickets => {
          tickets.forEach(async ticket => {
            await Ticket.findByIdAndUpdate(ticket._id, { $set: userFields }, { new: false })
            .then( _ => ticket)
            .catch(err => res.status(400).send({ msg: `Error: ${err}.`}));
          });
        })
        .then( async _ => {
          let updated_tickets = await Ticket.find().where({ 'issuedBy._id': req.params.id });
          if(updated_tickets) {
            res.json(updated_tickets);
          }
        })
        .catch(err => res.status(400).json({ msg: `Error: ${err}`}));
      } 
      if(userType === 'technician') {
        // IF user === 'technician' THEN update 'assignedTo' field
        Ticket.find().where({ 'assignedTo._id': req.params.id })
        .then(tickets => {
          tickets.forEach(async ticket => {
            await Ticket.findByIdAndUpdate(ticket._id, { $set: userFields }, { new: false })
            .then( _ => ticket)
            .catch(err => res.status(400).send({ msg: `Error: ${err}.`}));
          });
        })
        .then( async _ => {
          let updated_tickets = await Ticket.find().where({ 'assignedTo._id': req.params.id });
          if(updated_tickets) {
            res.json(updated_tickets);
          }
        })
        .catch(err => res.status(400).json({ msg: `Error: ${err}`}));
      }
    } 
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: `Server Error: ${err.message}`});
  }
});

// @route   PUT api/users/comments/:user_id
// @desc    Update user's first and last name in Comments Table
// @access  Private
router.put('/comments/:id', [ auth, [
  check('firstName', 'Please enter first name').not().isEmpty(),
  check('lastName', 'Please enter last name').not().isEmpty(),
  check('userType', 'userType is required').not().isEmpty()
  ] ], async (req,res) => {
  const errors = validationResult(req);

  // If there are errors in validation
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Destructure firstName and lastName
  const { firstName, lastName, userType } = req.body;

  // Build updated user object 
  const userFields = {
    user: {
      id: '',
      firstName: '',
      lastName: '',
      userType: ''
    }
  };
  
  userFields.user.id = req.params.id;
  if(firstName) userFields.user.firstName = firstName;
  if(lastName) userFields.user.lastName = lastName;
  if(userType) userFields.user.userType = userType;

  try {
    // Find user that matches the id
    let user = await User.findById(req.params.id);

    // If user does not exists
    if(!user) {
      return res.status(404).json({ msg: 'User not found' });
    } 
    else {
      // Update User's Info in Comments database
      Comment.find().where({ 'user.id': req.params.id })
        .then(comments => {
          comments.forEach(comment => {
            Comment.findByIdAndUpdate(comment._id, { $set: userFields }, { new: false })
              .then( _ => comment)
              .catch(err => res.status(400).json({ msg: `Error: ${err}`}));
          });
        })
        .then( async _ => {
          let updated_comments = await Comment.find().where({ 'user.id': req.params.id });
          if(updated_comments) {
            res.json(updated_comments);
          }
        })
        .catch(err => res.status(400).json({ msg: `Error: ${err}`}));
    } 
  } catch (err) {
    console.error(err.message);
    res.status(500).send(`Server Error: ${err.message}`);
  }
});

// @route   DELETE api/users
// @desc    Delete a user
// @access  Private
router.delete('/:id', auth, async (req,res) => {
    
  // Find the user by id
  let user = await User.findById(req.params.id) 

  if(!user) {
    return res.status(404).json({ msg: 'User not found' });
  }
  // If user exists then compare user input password to current password in database
  let isMatch = await bcrypt.compare(req.headers.password, user.password);
  
  if(!isMatch) {
    return res.status(400).json({ msg: 'Incorrect password'});
  } else {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.json({ msg: 'User deleted' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
});

module.exports = router;
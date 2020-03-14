const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Ticket = require('../models/Ticket');
const User = require('../models/User');

// @route   GET api/tickets
// @desc    Get all tickets
// @access  Private
router.get('/', async (req,res) => {
  try {
    // Gets all tickets and sort by latest tickets
    const tickets = await Ticket.find().sort({ _id: 'desc' });
    res.json(tickets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/tickets
// @desc    Add ticket
// @access  Private
router.post('/', [ auth, [
  check('title', 'Title is required').not().isEmpty(),
  check('description', 'Please enter a description for the ticket').not().isEmpty(),
  check('priority', 'Please select priority level').not().isEmpty()
  ] ], async (req,res) => {
  const errors = validationResult(req);

  // If there are errors in validation
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { ticket_id, title, description, priority, issuedBy } = req.body;
    
  try {
    // Create ticket object 
    ticket = new Ticket({
      ticket_id,
      title,
      description,
      priority,
      issuedBy
    });

    await ticket.save();

    res.json({ msg: 'Ticket added.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/tickets
// @desc    Update ticket
// @access  Private
router.put('/:id', [ auth , [
  check('title', 'Title is required').not().isEmpty(),
  check('description', 'Please enter a description for the ticket').not().isEmpty(),
  check('priority', 'Please select priority level').not().isEmpty()
  ] ], async (req,res) => {
  const errors = validationResult(req);

  // If there are errors in validation
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Check if ticket is existing
  let ticket = await Ticket.findById(req.params.id);
  if(!ticket) return res.status(404).json({ msg: 'Ticket not found' });
  
  // Destructure
  const { userId, title, description, priority } = req.body;

  // Make sure user owns the ticket
  if(userId !== ticket.issuedBy.id) return res.status(401).json({ msg: 'Not authorized.'});

  // If user owns the ticket THEN
  // Build updated ticket object 
  const ticketFields = {};
  if(title) ticketFields.title = title;
  if(description) ticketFields.description = description;
  if(priority) ticketFields.priority = priority;

  try {
    // Update ticket with new information
    ticket = await Ticket.findByIdAndUpdate(req.params.id, { $set: ticketFields }, { new: true });
    
    res.json(ticket); 
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/tickets
// @desc    Delete a ticket
// @access  Private
router.delete('/:id', auth, async (req,res) => {
  try {
    // Find the ticket by id
    let ticket = await Ticket.findById(req.params.id) 
    // Check if ticket exists
    if(!ticket) return res.status(404).json({ msg: 'Ticket not found' });
    // Find ticket by id and delete
    await Ticket.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Ticket deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
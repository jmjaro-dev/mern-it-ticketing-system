const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Comment = require('../models/Comment');

// @route   GET api/comments/:id
// @desc    Get all for the ticket
// @access  Private
router.get('/:id', auth, async (req,res) => {
  try {
    // Gets all comments for the ticket and sort by latest in ascending manner
    const comments = await Comment.find({ ticketId: req.params.id }).sort({ date: -1 });
    res.json(comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/comments
// @desc    Add comment
// @access  Private
router.post('/', [ auth, [
  check('message', 'Please enter a message').not().isEmpty()
  ] ], async (req,res) => {
  const errors = validationResult(req);

  // If there are errors in validation
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { ticketId, message, userId } = req.body;
    
  try {
    // Create comment object 
    comment = new Comment({
      ticketId,
      message,
      userId
    });

    // Save comment to database
    await comment.save();

    res.json({ msg: 'Comment added.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/comments
// @desc    Update comment message
// @access  Private
router.put('/:id', [ auth, [ 
  check('message', 'Please enter a message').not().isEmpty()
  ] ], async (req,res) => {
  const errors = validationResult(req);

  // If there are errors in validation
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Check if comment is existing
  let comment = await Comment.findById(req.params.id);
  if(!comment) return res.status(404).json({ msg: 'Comment not found' });
  
  // Destructure
  const { message, userId } = req.body;

  // Make sure user owns the comment
  if(userId !== comment.userId) return res.status(401).json({ msg: 'Not authorized.'});

  // If user owns the comment THEN
  // Build updated comment object 
  const messageField = { message };
  
  try {
    // Update ticket with new information
    comment = await Comment.findByIdAndUpdate(req.params.id, { $set: messageField }, { new: true });
    
    res.json(comment); 
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/comments
// @desc    Delete a comment
// @access  Private
router.delete('/:id', auth, async (req,res) => {
  try {
    // Find the comment by id
    let comment = await Comment.findById(req.params.id) 
    // Check if comment exists
    if(!comment) return res.status(404).json({ msg: 'Comment not found' });
    // Find comment by id and delete
    await Comment.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Comment deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
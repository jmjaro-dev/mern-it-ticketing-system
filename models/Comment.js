const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
  ticketId: {
    type: Number,
    required: true
  },
  userId: {
    type: Number,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('comment', CommentSchema);
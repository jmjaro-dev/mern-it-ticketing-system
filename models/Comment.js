const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
  ticket_id: {
    type: Number,
    required: true
  },
  user: {
    type: Object,
    required: true
  },
  message: {
    type: String,
    required: true
  }
},
{
  timestamps: true
});

module.exports = mongoose.model('comment', CommentSchema);
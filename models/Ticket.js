const mongoose = require('mongoose');

const TicketSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  priorityLevel: {
    type: String,
    required: true
  },
  dateIssued: {
    type: Date,
    default: Date.now
  },
  dateClosed: {
    type: Date
  },
  status: {
    type: String,
    default: open
  },
  issuedBy: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('ticket', TicketSchema);
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const TicketSchema = mongoose.Schema({
  ticket_id: {
    type: Number,
    ref: 'ticket'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    required: true
  },
  dateClosed: {
    type: Date
  },
  status: {
    type: String,
    default: 'open'
  },
  issuedBy: {
    type: Object,
    required: true
  },
  assignedTo: {
    type: Object,
    default: {
      to: 'Unassigned'
    }
  },
  isUpdated : {
    type: Boolean,
    default: false
  }
},
{
  timestamps : true
});

TicketSchema.plugin(autoIncrement.plugin, 'ticket');
module.exports = mongoose.model('ticket', TicketSchema);
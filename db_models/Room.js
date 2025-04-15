const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);

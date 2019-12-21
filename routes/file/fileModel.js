const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
  path: {
    type: String,
    required: true,
    trim: true,
  },
  originalName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('files', imageSchema);

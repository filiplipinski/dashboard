const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// unique daje ze _id na pewno bedzie unikalny
const userSchema = new Schema({
  name: String,
  userName: {
    type: String,
    required: true,
    // unique: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  emailAddress: {
    type: String,
    required: true,
    // unique: true
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('users', userSchema);

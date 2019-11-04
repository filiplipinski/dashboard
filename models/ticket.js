const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ticketSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
    state: {
      type: String,
      required: true,
    },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'users', default: null },
    createdAt: { type: Date, default: Date.now },
    lastModified: {
      type: Date,
      default: Date.now,
    },
    priority: {
      type: String,
      default: 'normal',
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    comments: [
      {
        postedBy: { type: Schema.Types.ObjectId, ref: 'users' },
        message: {
          type: String,
          required: true,
          default: '',
          maxlength: 1000,
        },
        createdAt: { type: Date, default: Date.now },
        _id: false,
      },
    ],
  },
  { versionKey: false },
);

module.exports = mongoose.model('tickets', ticketSchema);

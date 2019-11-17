const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ticketSchema = new Schema(
  {
    group: { type: Schema.Types.ObjectId, ref: 'groups', required: true },
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
    description: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 10000,
    },
    state: {
      type: String,
      enum: ['cancelled', 'inRealization', 'finalized', 'waiting', 'todo'],
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
      enum: ['low', 'normal', 'high'],
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

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
    // comments: [
    //   {
    //     text: {
    //       type: String,
    //       required: true,
    //       maxlength: 1000,
    //     },
    //     postedBy: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: 'users',
    //     },
    //     createdAt: { type: Date, default: Date.now },
    //   },
    // ],
  },
  { versionKey: false },
);

module.exports = mongoose.model('tickets', ticketSchema);

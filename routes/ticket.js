const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config');

const router = express.Router();
const Ticket = require('../models/ticket');

router.get('/list', (req, res) => {
  Ticket.find()
    .populate('assignedTo', 'userName')
    .populate('comments.postedBy', 'userName')
    .then(tickets => {
      res.json({
        success: true,
        tickets,
      });
    })
    .catch(error => {
      res.status(400).json({ error });
    });
});

router.get('/show/:_id', (req, res, next) => {
  const {
    params: { _id },
  } = req;

  Ticket.findById(_id)
    .populate('assignedTo', 'userName')
    .populate('comments.postedBy', 'userName')
    .then(ticket => {
      res.json({
        success: true,
        ticket,
      });
    })
    .catch(err => {
      res.status(400).json({ message: 'There is no such a ticket', error: err });
    });
});

router.post('/add', (req, res, next) => {
  const {
    body: { title, state, assignedTo, priority },
  } = req;

  const ticket = new Ticket({
    title,
    state,
    assignedTo,
    priority,
  });

  ticket
    .save()
    .then(data => {
      res.json({
        success: true,
        message: 'Ticket added successfully',
        ticket: data,
      });
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
});

router.patch('/edit/:_id', async (req, res, next) => {
  const {
    params: { _id },
    body,
  } = req;

  const token = req.headers.authorization.split(' ')[1];

  let decodedUserName = '';
  await jwt.verify(token, config.jwtSecret, (err, decoded) => {
    decodedUserName = decoded.id;
  });

  const { comment, ...dataToUpdate } = body;
  const preparedComment = { ...comment, postedBy: decodedUserName };

  Ticket.findByIdAndUpdate(
    { _id },
    { $set: { ...dataToUpdate }, $push: { comments: preparedComment } },
    { new: true },
  )
    .populate('assignedTo', 'userName')
    .populate('comments.postedBy', 'userName')
    .then(updatedTicket => {
      res.json({
        success: true,
        ticket: { ...updatedTicket.toObject(), lastModified: new Date() },
      });
    })
    .catch(err => {
      res.status(400).json({ message: 'There is no such a ticket', error: err });
    });
});

module.exports = router;

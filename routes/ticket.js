const express = require('express');

const router = express.Router();
const Ticket = require('../models/ticket');

router.get('/list', (req, res) => {
  Ticket.find()
    .populate('assignedTo')
    .then(tickets => {
      const preparedTickets = tickets.map(ticket => ({
        ...ticket.toObject(),
        assignedTo: ticket.assignedTo ? ticket.assignedTo.userName : null,
      }));
      res.json({
        success: true,
        tickets: preparedTickets,
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
    .populate('assignedTo')
    .then(ticket => {
      const preparedTicket = {
        ...ticket.toObject(),
        assignedTo: ticket.assignedTo ? ticket.assignedTo.userName : null,
      };
      res.json({
        success: true,
        ticket: preparedTicket,
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

router.patch('/edit/:_id', (req, res, next) => {
  const {
    params: { _id },
    body,
  } = req;

  Ticket.findByIdAndUpdate({ _id }, { $set: { ...body } }, { new: true })
    .then(updatedTicket => {
      res.json({
        success: true,
        ticket: updatedTicket,
      });
    })
    .catch(err => {
      res.status(400).json({ message: 'There is no such a ticket', error: err });
    });
});

module.exports = router;

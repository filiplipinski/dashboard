const jwt = require('jsonwebtoken');
const config = require('../../config');
const TicketService = require('./ticketService');

const ticketsList = async (req, res) => {
  try {
    const tickets = await TicketService.ticketsList();

    res.json({
      success: true,
      tickets,
    });
  } catch (err) {
    res.status(400).json(err && err.message);
  }
};

const addTicket = async (req, res) => {
  const { body } = req;

  try {
    const newTicket = await TicketService.addTicket(body);

    res.json({
      success: true,
      message: 'Ticket added successfully',
      ticket: newTicket,
    });
  } catch (err) {
    res.status(400).json(err && err.message);
  }
};

const showTicket = async (req, res) => {
  const {
    params: { _id },
  } = req;

  try {
    const ticket = await TicketService.showTicket(_id);

    res.json({
      success: true,
      ticket,
    });
  } catch (err) {
    res.status(400).json(err && err.message);
  }
};

const editTicket = async (req, res) => {
  const {
    params: { _id },
    body,
  } = req;

  const token = req.headers.authorization.split(' ')[1];

  const decodedUserName = jwt.verify(token, config.jwtSecret);

  const { comment, ...dataToUpdate } = body;
  const preparedComment = { ...comment, postedBy: decodedUserName };

  try {
    const updatedTicket = await TicketService.editTicket({ _id, dataToUpdate, preparedComment });

    res.json({
      success: true,
      ticket: updatedTicket,
    });
  } catch (err) {
    res.status(400).json(err && err.message);
  }
};

module.exports = { ticketsList, addTicket, showTicket, editTicket };

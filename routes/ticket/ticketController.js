const TicketService = require('./ticketService');
const decodeToken = require('../../utils/decodeToken');

const ticketsList = async (req, res) => {
  const {
    headers: { authorization },
    query,
  } = req;

  const user = decodeToken(authorization);

  try {
    const tickets = await TicketService.ticketsList(user, query);

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
    headers: { authorization },
  } = req;
  const { comment, ...dataToUpdate } = body;
  const user = decodeToken(authorization);

  // prepare data
  const preparedDataToUpdate = { ...dataToUpdate };
  Object.keys(preparedDataToUpdate).forEach(
    key =>
      (preparedDataToUpdate[key] === null ||
        preparedDataToUpdate[key] === undefined ||
        preparedDataToUpdate[key] === '') &&
      delete preparedDataToUpdate[key],
  );

  // prepare comment
  const preparedComment = { ...comment, postedBy: user, changes: preparedDataToUpdate };

  try {
    const updatedTicket = await TicketService.editTicket({ _id, preparedDataToUpdate, preparedComment });

    res.json({
      success: true,
      ticket: updatedTicket,
    });
  } catch (err) {
    res.status(400).json(err && err.message);
  }
};

const deleteTicket = async (req, res) => {
  const {
    params: { _id },
  } = req;

  try {
    const deletedTicket = await TicketService.deleteTicket(_id);

    res.json({
      success: true,
      deletedTicket,
    });
  } catch (err) {
    res.status(400).json(err && err.message);
  }
};

module.exports = { ticketsList, addTicket, showTicket, editTicket, deleteTicket };

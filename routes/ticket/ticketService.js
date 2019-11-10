const Ticket = require('./ticketModel');

const ticketsList = () => {
  return Ticket.find()
    .populate('assignedTo', 'userName')
    .populate('comments.postedBy', 'userName')
    .then(tickets => tickets)
    .catch(err => {
      throw err;
    });
};
const addTicket = ({ title, state, assignedTo, priority, description }) => {
  const ticket = new Ticket({
    title,
    state,
    assignedTo: !!assignedTo ? assignedTo : null,
    priority,
    description,
  });

  return ticket
    .save()
    .then(data => data)
    .catch(err => {
      throw err;
    });
};

const showTicket = _id => {
  return Ticket.findById(_id)
    .populate('assignedTo', 'userName')
    .populate('comments.postedBy', 'userName')
    .then(ticket => {
      if (ticket) return ticket;
      throw Error('There is no such a ticket');
    })
    .catch(err => {
      throw err;
    });
};

const editTicket = ({ _id, dataToUpdate, preparedComment }) => {
  return Ticket.findByIdAndUpdate(
    { _id },
    { $set: { ...dataToUpdate, lastModified: new Date() }, $push: { comments: preparedComment } },
    { new: true },
  )
    .populate('assignedTo', 'userName')
    .populate('comments.postedBy', 'userName')
    .then(updatedTicket => {
      if (updatedTicket) return updatedTicket;
      throw Error('There is no such a ticket');
    })
    .catch(err => {
      throw err;
    });
};

module.exports = { ticketsList, addTicket, showTicket, editTicket };
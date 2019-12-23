const Ticket = require('./ticketModel');
const Group = require('../group/groupModel');

const ticketsList = async (user, query) => {
  // const { assignedTo } = query;
  const userGroups = await Group.find({ members: { $in: user._id } }, '_id');

  return Ticket.find({ group: userGroups })
    .populate('assignedTo', 'userName')
    .populate('comments.postedBy', 'userName')
    .populate('group', 'name')
    .then(tickets => tickets)
    .catch(err => {
      throw err;
    });
};
const addTicket = ({ group, title, state, assignedTo, priority, description }) => {
  const ticket = new Ticket({
    group,
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
    .populate('comments.changes.assignedTo', 'userName')
    .populate('uploadedFiles', 'originalName')
    .populate('comments.changes.uploadedFile', 'originalName')
    .populate({
      path: 'group',
      populate: { path: 'members', select: 'userName' },
    })
    .then(ticket => {
      if (ticket) return ticket;
      throw Error('There is no such a ticket');
    })
    .catch(err => {
      throw err;
    });
};

const editTicket = ({ _id, preparedDataToUpdate, preparedComment }) => {
  const { uploadedFile, ...dataToSet } = preparedDataToUpdate;

  const dataToPush = !uploadedFile
    ? { comments: preparedComment }
    : { comments: preparedComment, uploadedFiles: uploadedFile };

  return Ticket.findByIdAndUpdate(
    { _id },
    {
      $set: { ...dataToSet, lastModified: new Date() },
      $push: dataToPush,
    },
    { new: true },
  )
    .populate('assignedTo', 'userName')
    .populate('comments.postedBy', 'userName')
    .populate('comments.changes.assignedTo', 'userName')
    .populate({
      path: 'group',
      populate: { path: 'members', select: 'userName' },
    })
    .then(updatedTicket => {
      if (updatedTicket) {
        return updatedTicket;
      }
      throw Error('There is no such a ticket');
    })
    .catch(err => {
      throw err;
    });
};

const deleteTicket = _id => {
  return Ticket.findByIdAndRemove({ _id })
    .then(deletedTicket => {
      if (deletedTicket) return deletedTicket;
      throw Error('There is no such a ticket');
    })
    .catch(err => {
      throw err;
    });
};

module.exports = { ticketsList, addTicket, showTicket, editTicket, deleteTicket };

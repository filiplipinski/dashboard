const Group = require('./groupModel');
const User = require('../user/userModel');

const addGroup = async ({ name, members }) => {
  const group = await Group.findOne({ name });
  if (group) throw Error('Group name exists unavailable');

  const users = await User.find({
    userName: {
      $in: members,
    },
  }).distinct('_id');

  const newGroup = new Group({
    name,
    members: users,
  });

  return newGroup
    .save()
    .then(data => data)
    .catch(err => {
      throw err;
    });
};

const getGroups = () => {
  return (
    // members: 0 daje to ze pomija to pole
    // Group.find({}, { members: 0 })
    Group.find()
      .populate('members', 'userName')
      .then(groups => groups)
      .catch(err => {
        throw err;
      })
  );
};

module.exports = { addGroup, getGroups };

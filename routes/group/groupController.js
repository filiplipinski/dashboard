const GroupService = require('./groupService');

const addGroup = async (req, res) => {
  const {
    body: { name, members },
  } = req;

  try {
    const newGroup = await GroupService.addGroup({ name, members });

    res.json({
      success: true,
      newGroup: { createdAt: newGroup.createdAt, name: newGroup.name },
    });
  } catch (err) {
    res.status(400).json(err && err.message);
  }
};

const getGroups = async (req, res) => {
  try {
    const groups = await GroupService.getGroups();

    res.json({
      success: true,
      groups,
    });
  } catch (err) {
    res.status(400).json(err && err.message);
  }
};

module.exports = { addGroup, getGroups };
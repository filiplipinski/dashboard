const express = require('express');
const GroupController = require('./groupController');

const router = express.Router();

router.post('/add', GroupController.addGroup);

module.exports = router;

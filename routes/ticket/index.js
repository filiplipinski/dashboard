const express = require('express');
const TicketController = require('./ticketController');

const router = express.Router();

router.get('/list', TicketController.ticketsList);
router.post('/add', TicketController.addTicket);
router.get('/show/:_id', TicketController.showTicket);
router.patch('/edit/:_id', TicketController.editTicket);

module.exports = router;

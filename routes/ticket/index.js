const express = require('express');
const TicketController = require('./ticketController');

const router = express.Router();

router.get('/list', TicketController.ticketsList);
router.post('/add', TicketController.addTicket);
router.get('/show/:_id', TicketController.showTicket);
router.patch('/edit/:_id', TicketController.editTicket);
router.delete('/delete/:_id', TicketController.deleteTicket);

module.exports = router;

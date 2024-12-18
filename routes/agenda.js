const express = require('express');
const router = express.Router();
const agendaController = require('../controllers/agendaController');

router.get('/agendas', agendaController.getAllAgendas);

router.get('/agendas/:date', agendaController.getAgendaByDate);

router.post('/agendas/:date/task', agendaController.addTask);

module.exports = router;
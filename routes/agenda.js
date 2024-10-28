const express = require('express');
const router = express.Router();
const agendaController = require('../controllers/agendaController');

router.get('/agendas', agendaController.getAllAgendas);

router.get('/agendas/:date', agendaController.getAgendaByDate);

module.exports = router;
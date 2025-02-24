const express = require('express');
const router = express.Router();
const agendaController = require('../controllers/agendaController');

/**
 * @swagger
 * /api/agendas:
 *   get:
 *     summary: Get all agendas
 *     tags: [Agenda]
 *     responses:
 *       200:
 *         description: List of all agendas
 */

router.get('/agendas', agendaController.getAllAgendas);


/**
 * @swagger
 * /api/agendas/{date}:
 *   get:
 *     summary: Get agenda by date
 *     tags: [Agenda]
 *     parameters:
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *             type: string
 *             format: date
 *             example: "2025-01-07"
 *         description: The date to filter agendas (YYYY-MM-DD format)
 *     responses:
 *       200:
 *         description: Agenda by date
 */

router.get('/agendas/:date', agendaController.getAgendaByDate);

router.post('/agendas/:date/task', agendaController.addTask);

module.exports = router;
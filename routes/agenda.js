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


/**
 * @swagger
 * /api/agendas/{date}/task:
 *   post:
 *     summary: Add a new task to the agenda for a specific date
 *     tags: [Agenda]
 *     parameters:
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *           example: "2025-01-07"
 *         description: The date to add the task to (YYYY-MM-DD format)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subject:
 *                 type: string
 *                 example: "Math"
 *               topic:
 *                 type: string
 *                 example: "Calculus"
 *               priority:
 *                 type: string
 *                 enum: ["high", "medium", "low"]
 *                 example: "high"
 *               time:
 *                 type: string
 *                 example: "10:00"
 *               estimatedDuration:
 *                 type: string
 *                 example: "2h"
 *             required:
 *               - subject
 *               - topic
 *               - priority
 *               - time
 *               - estimatedDuration
 *     responses:
 *       201:
 *         description: Task added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task added successfully"
 *                 agenda:
 *                   type: object
 *                   properties:
 *                     date:
 *                       type: string
 *                       example: "2025-01-07"
 *                     tasks:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           subject:
 *                             type: string
 *                             example: "Math"
 *                           topic:
 *                             type: string
 *                             example: "Calculus"
 *                           priority:
 *                             type: string
 *                             enum: ["high", "medium", "low"]
 *                             example: "high"
 *                           time:
 *                             type: string
 *                             example: "10:00"
 *                           estimatedDuration:
 *                             type: string
 *                             example: "2h"
 *       400:
 *         description: Invalid data provided or task cannot be created for past date
 *       500:
 *         description: Error adding task
 */
router.post('/agendas/:date/task', agendaController.addTask);

module.exports = router;
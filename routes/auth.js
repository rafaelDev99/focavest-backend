const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: 
 */

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Cria um novo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               status:
 *                 type: string
 *               cursoId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TarefaDto'
 */
router.post('/register', (req, res) => {
    const { titulo, status, cursoId } = req.body;
    const newTask = taskService.createTask(titulo, status, cursoId);
    res.status(201).json(newTask);
});

module.exports = router;
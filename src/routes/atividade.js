const express = require('express');
const atividadeController = require('../controllers/atividadeController')

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Atividades
 *   description: Gerenciamento de atividades
 */

/**
 * @swagger
 * /api/atividades:
 *   get:
 *     summary: Retorna todas as atividades
 *     tags: [Atividades]
 *     responses:
 *       200:
 *         description: List of all atividades
 */
router.get('/', async (req, res) => {
    const data = await atividadeController.getAllAtividades();
    return res.json(data);
});

/**
 * @swagger
 * /api/atividades/{id}:
 *   get:
 *     summary: Retorna uma atividade pelo id
 *     tags: [Atividades]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: ID da atividade
 *     responses:
 *       200:
 *         description: atividade
 */
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const data = await atividadeController.getAtividadeById(id);
    return res.json(data);
});

/**
 * @swagger
 * /api/atividades/{rotinaId}:
 *   get:
 *     summary: Retorna as atividades pelo id de uma rotina
 *     tags: [Atividades]
 *   parameters:
 *      - in: path
 *        name: rotinaId
 *        schema:
 *           type: string
 *        required: true
 *        description: Id da rotina
 *   responses:
 *       200:
 *         description: atividades
 */
router.get('/:rotinaId', async (req, res) => {
    const rotinaId = req.params.rotinaId
    const data = await atividadeController.getAtividadesByRotinaId(rotinaId);
    return res.json(data);
});

/**
 * @swagger
 * /api/atividades:
 *   post:
 *     summary: Cria uma nova atividade
 *     tags: [Atividades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rotina_id:
 *                 type: string
 *               cor:
 *                 type: string
 *               descricao:
 *                 type: string
 *               data_inicio:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-04-27T14:00:00Z"
 *               data_fim:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-04-27T14:00:00Z"
 *               duracao:
 *                 type: integer
 *                 format: int32
 *     responses:
 *       201:
 *         description: Atividade criada com sucesso
 */
router.post('/', async (req, res) => {
    const result = await atividadeController.create(req.body)
    if(result.error){
        return res.status(400).json({
            'status': 'Failure',
            'message': result.message
        })
    }

    return res.status(201).json({
        'status': 'Ok',
        'message': result.message,
        'body': result.body
    });
});


module.exports = router;
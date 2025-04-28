const express = require('express');
const rotinaController = require('../controllers/rotinaController');

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Rotinas
 *   description: Gerenciamento de rotinas
 */

/**
 * @swagger
 * /api/rotinas/{usuarioId}:
 *   get:
 *     summary: Retorna rotinas pelo id do usuario
 *     tags: [Rotinas]
 *     parameters:
 *        - in: path
 *          name: usuarioId
 *          schema:
 *             type: string
 *          required: true
 *          description: ID do usuario
 *     responses:
 *       200:
 *         description: rotinas
 */
router.get('/:usuarioId', async (req, res) => {
    const id = req.params.usuarioId;
    console.log(id)
    const result = await rotinaController.getRotinasByUsuario(id);
    if(result.error){
        return res.status(400).json({
            'status': 'Failure',
            'message': result.message
        })
    }
    return res.json(result.body);
});

/**
 * @swagger
 * /api/rotinas/progresso/{usuarioId}:
 *   get:
 *     summary: Retorna progresso semanal pelo id do usuario
 *     tags: [Rotinas]
 *     parameters:
 *        - in: path
 *          name: usuarioId
 *          schema:
 *             type: string
 *          required: true
 *          description: ID do usuario
 *     responses:
 *       200:
 *         description: progresso
 */
router.get('/progresso/:usuarioId', async (req, res) => {
    const id = req.params.usuarioId;
    const result = await rotinaController.getProgressoByWeekAndUsuarioId(id)
    if(result.error){
        return res.status(400).json({
            'status': 'Failure',
            'message': result.message
        })
    }
    return res.json(result.body);
});

/**
 * @swagger
 * /api/rotinas/{id}:
 *   patch:
 *     summary: Atualiza uma rotina existente
 *     tags: [Rotinas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do vestibular
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                  type: string
 *               descricao:
 *                 type: string
 *               materia:
 *                 type: string
 *               topico:
 *                 type: string
 *               data:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-04-27T14:00:00Z"
 *     responses:
 *       200:
 *         description: Rotina atualizada com sucesso
 *       400:
 *         description: Erro na atualização da rotina
 */
router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await rotinaController.updateRotina(id, req.body);

    if (result.error) {
        return res.status(400).json({
            status: 'Failure',
            message: result.message
        });
    }

    return res.status(200).json({
        status: 'Ok',
        message: result.message,
        body: result.body
    });
});

/**
 * @swagger
 * /api/rotinas:
 *   post:
 *     summary: Cria uma nova rotina
 *     tags: [Rotinas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               materia:
 *                 type: string
 *               topico:
 *                 type: string
 *               data:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-04-27T14:00:00Z"
 *               usuarioId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Vestibular criado com sucesso
 */
router.post('/', async (req, res) => {
    const result = await rotinaController.createRotina(req.body)
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


/**
 * @swagger
 * /api/rotinas/{id}:
 *   delete:
 *     summary: Remove uma rotina pelo id
 *     tags: [Rotinas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da rotina a ser deletado
 *     responses:
 *       200:
 *         description: rotina deletado com sucesso
 *       404:
 *         description: rotina não encontrado
 */
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await rotinaController.deleteRotina(id);

    if (result.error) {
        return res.status(404).json({
            status: 'Failure',
            message: result.message
        });
    }

    return res.status(200).json({
        status: 'Ok',
        message: result.message
    });
});

module.exports = router;
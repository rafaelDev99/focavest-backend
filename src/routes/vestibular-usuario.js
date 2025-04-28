const express = require('express');
const vestibularUsuarioController = require('../controllers/vestibularUsuarioController');

const router = express.Router();

/**
 * @swagger
 * /api/vestibular-usuario:
 *   post:
 *     summary: Associa um vestibular existente a um usuário
 *     tags: [Vestibular-Usuario]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usuario_id
 *               - vestibular_id
 *             properties:
 *               usuario_id:
 *                 type: string
 *                 format: uuid
 *               vestibular_id:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       201:
 *         description: Vestibular associado ao usuário com sucesso
 */
router.post('/', async (req, res) => {
    const { usuario_id, vestibular_id } = req.body;
    const result = await vestibularUsuarioController.associarVestibularUsuario(usuario_id, vestibular_id);

    if (result.error) {
        return res.status(400).json({
            status: 'Failure',
            message: result.message
        });
    }

    return res.status(201).json({
        status: 'Ok',
        message: result.message,
        body: result.body
    });
});

/**
 * @swagger
 * /api/vestibular-usuario/{usuarioId}:
 *   get:
 *     summary: Lista vestibulares associados a um usuário
 *     tags: [Vestibular-Usuario]
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Lista de vestibulares do usuário
 */
router.get('/:usuarioId', async (req, res) => {
    const usuarioId = req.params.usuarioId;
    const result = await vestibularUsuarioController.getVestibularesByUsuario(usuarioId);

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
 * /api/vestibular-usuario/{usuarioId}/proximo:
 *   get:
 *     summary: Retorna o vestibular mais próximo associado ao usuário
 *     tags: [Vestibular-Usuario]
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Vestibular mais próximo do usuário
 */
router.get('/:usuarioId/proximo', async (req, res) => {
    const usuarioId = req.params.usuarioId;
    const result = await vestibularUsuarioController.getProximoVestibular(usuarioId);

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

module.exports = router;

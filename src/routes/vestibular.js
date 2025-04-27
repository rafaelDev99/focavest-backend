const express = require('express');
const vestibularController = require('../controllers/vestibularController')

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Vestibulares
 *   description: Gerenciamento de vestibulares
 */


/**
 * @swagger
 * /api/vestibulares:
 *   get:
 *     summary: Retorna todos os vestibulares
 *     tags: [Vestibulares]
 *     responses:
 *       200:
 *         description: List of all vestibulares
 */
router.get('/', async (req, res) => {
    const data = await vestibularController.getAllVestibulares();
    return res.json(data);
});


/**
 * @swagger
 * /api/vestibulares/{id}:
 *   get:
 *     summary: Retorna um vestibular pelo id
 *     tags: [Vestibulares]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: ID do vestibular
 *     responses:
 *       200:
 *         description: vestibular
 */
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const data = await vestibularController.getVestibularById(id);
    return res.json(data);
});

/**
 * @swagger
 * /api/vestibulares:
 *   post:
 *     summary: Cria um novo vestibular
 *     tags: [Vestibulares]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-04-27T14:00:00Z"
 *               pfp:
 *                 type: string
 *               uni:
 *                 type: string
 *               curso:
 *                 type: string
 *               site:
 *                 type: string
 *     responses:
 *       201:
 *         description: Vestibular criado com sucesso
 */
router.post('/', async (req, res) => {
    const result = await vestibularController.create(req.body)
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
 * /api/vestibulares/{id}:
 *   patch:
 *     summary: Atualiza um vestibular existente
 *     tags: [Vestibulares]
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
 *               data:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-04-27T14:00:00Z"
 *               pfp:
 *                 type: string
 *               uni:
 *                 type: string
 *               curso:
 *                 type: string
 *               site:
 *                 type: string
 *     responses:
 *       200:
 *         description: Vestibular atualizado com sucesso
 *       400:
 *         description: Erro na atualização do vestibular
 */
router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await vestibularController.update(id, req.body);

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
 * /api/vestibulares/{id}:
 *   delete:
 *     summary: Remove um vestibular pelo id
 *     tags: [Vestibulares]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do vestibular a ser deletado
 *     responses:
 *       200:
 *         description: Vestibular deletado com sucesso
 *       404:
 *         description: Vestibular não encontrado
 */
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await vestibularController.delete(id);

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
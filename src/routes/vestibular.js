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

module.exports = router;
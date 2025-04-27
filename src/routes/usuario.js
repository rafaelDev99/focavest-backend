const express = require('express');
const usuarioController = require('../controllers/usuarioController')

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Gerenciamento de usuarios
 */


/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Retorna todos os usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: List of all usuarios
 */
router.get('/', async (req, res) => {
    const data = await usuarioController.getAllUsuario();
    return res.json(data);
});


/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Retorna um usuario pelo id
 *     tags: [Usuarios]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: ID do usuario
 *     responses:
 *       200:
 *         description: usuario
 */
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const data = await usuarioController.getUsuarioById(id);
    return res.json(data);
});

/**
 * @swagger
 * /api/usuarios/{email}:
 *   get:
 *     summary: Retorna um usuario pelo email
 *     tags: [Usuarios]
 *   parameters:
 *      - in: path
 *        name: email
 *        schema:
 *           type: string
 *        required: true
 *        description: Email do usuario
 *   responses:
 *       200:
 *         description: usuario
 */
router.get('/:email', async (req, res) => {
    const email = req.params.email
    const data = await usuarioController.getUsuarioByEmail(email);
    return res.json(data);
});


module.exports = router;
const express = require('express');
const usuarioController = require('../controllers/usuarioController')

const router = express.Router();

/**
 * tags:
 *   name: Usuarios
 *   description: Gerenciamento de usuarios
 */


/**
 * /api/usuarios:
 *   get:
 *     summary: Retorna todos os usuarios
 *     tags: [Usuarios]
 *   responses:
 *       200:
 *         description: List of all usuarios
 */
router.get('/', async (req, res) => {
    const data = await usuarioController.getAllUsuario();
    return res.json(data);
});


module.exports = router;
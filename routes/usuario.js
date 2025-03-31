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
 *     summary: Retorna todos os memebros com filtros opcionais
 *     tags: [Members]
 */
router.get('/', async (req, res) => {
    const usuarios = await usuarioController.getAllUsuario();
    res.json(members);
});


module.exports = router;
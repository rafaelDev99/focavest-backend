const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: 
 */

/**
 * @swagger
 * /api/auth/register:
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
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario criada com sucesso
 */
router.post('/register', async (req, res) => {
    const result = await authController.register(req.body)
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
 * /api/auth/login:
 *   post:
 *     summary: Faz o login do usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                  type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Token gerado
 */
router.post('/login', async (req, res) => {
    const result = await authController.login(req.body)
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
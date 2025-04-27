const express = require('express');
const rotinaController = require('../controllers/rotinaController')

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


module.exports = router;
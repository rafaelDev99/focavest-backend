const express = require('express');
const alunoController = require('../controllers/alunoController')

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Alunos
 *   description: Gerenciamento de alunos
 */


/**
 * @swagger
 * /api/alunos:
 *   get:
 *     summary: Retorna todos os alunos
 *     tags: [alunos]
 *   responses:
 *       200:
 *         description: List of all alunos
 */

router.get('/', async (req, res) => {
    const data = await alunoController.getAllAluno();
    return res.json(data);
});


module.exports = router;
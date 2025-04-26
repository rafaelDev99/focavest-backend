const express = require('express');
const alunoController = require('../controllers/alunoController')

const router = express.Router();

/**
 * tags:
 *   name: Alunos
 *   description: Gerenciamento de alunos
 */


/**
 * /api/alunos:
 *   get:
 *     summary: Retorna todos os alunos
 *     tags: [Alunos]
 *     responses:
 *       200:
 *         description: List of all alunos
 */
router.get('/', async (req, res) => {
    const data = await alunoController.getAllAluno();
    return res.json(data);
});


module.exports = router;
const alunoRepository = require('../infra/repository/aluno/aluno')

class AlunoController {
    async getAllAluno(){
        return await alunoRepository.getAllAluno();
    }
}

module.exports = new AlunoController();
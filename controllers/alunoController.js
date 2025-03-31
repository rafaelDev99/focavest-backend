const alunoRepository = require('../infra/repository/aluno/aluno')

class AlunoControlller {
    async getAllAluno(){
        return await alunoRepository.getAllAluno();
    }
}

module.exports = new AlunoControlller();
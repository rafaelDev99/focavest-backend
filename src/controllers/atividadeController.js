const atividadeRepository = require('../infra/repository/atividade/atividade')

class AtividadeController {
    async getAtividadeById(id){
        return await atividadeRepository.getAtividadeById(id);
    }
    async getAtividadesByRotinaId(rotinaId){
        return await atividadeRepository.getAtividadesByRotinaId(rotinaId);
    }
    async getAllAtividades(){
        return await atividadeRepository.getAllAtividades();
    }
}

module.exports = new AtividadeController();
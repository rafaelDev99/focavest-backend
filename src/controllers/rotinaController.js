const rotinaRepository = require('../infra/repository/rotina/rotina');

class RotinaController {
    async getRotinaById(id){
        return await rotinaRepository.getRotinaById(id);
    }
    async getRotinasByUsuario(usuarioId){
        return await rotinaRepository.getRotinasByUsuario(usuarioId);
    }
    async createRotina(body){
        const createRotinaDto = body;
        rotina = {
            nome: createRotinaDto.nome,
            descricao: createRotinaDto.descricao,
            materia: createRotinaDto.materia,
            topico: createRotinaDto.topico,
            data: createRotinaDto.data,
            usuario_id: createRotinaDto.usuarioId
        }
        return await rotinaRepository.createRotina()
    }

    async getProgressoByWeekAndUserId(id){
        const startOfWeek = new Date();
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        getProgressReq = {
            user_id: id,
            start_of_week: startOfWeek,
            end_of_week: endOfWeek
        }
    }
}

module.exports = new RotinaController();
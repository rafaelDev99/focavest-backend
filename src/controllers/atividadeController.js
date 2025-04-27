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
    async create(body){
        try{
            const createAtividadeDto = createVestibularDto_data(body);
            
            const created_at = new Date();

            const vestibular = {
                data: createVestibularDto.data,
                pfp: createVestibularDto.pfp,
                uni: createVestibularDto.uni,
                curso: createVestibularDto.curso,
                site: createVestibularDto.site,
                criado_em: created_at,
            }   

            const result = await vestibularRepository.createVestibular(vestibular)
            return {
                'error': false,
                'message': 'Vestibular created Successfuly!',
                'body': result
            }
        }catch(err){
            return ({
                'error': true,
                'message': err.message,
                'body': null
            })
        }
    }
}

module.exports = new AtividadeController();
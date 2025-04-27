const createAtividadeDto_data = require('../dto/atividade/createAtividadeDto');
const updateAtividadeDto_data = require('../dto/atividade/updateAtividadeDto');
const atividadeRepository = require('../infra/repository/atividade/atividade')

class AtividadeController {
    async getAtividadeById(id){
        try {
            const data = await atividadeRepository.getAtividadeById(id);
            return data;
        } catch (error) {
            console.error('Erro ao buscar atividade:', error);
            throw new Error('Não foi possível buscar a atividade.');
        }
    }
    async getAtividadesByRotinaId(rotinaId){
        try {
            const data = await atividadeRepository.getAtividadesByRotinaId(rotinaId);
            return data;
        } catch (error) {
            console.error('Erro ao buscar atividades:', error);
            throw new Error('Não foi possível buscar as atividades.');
        }
    }
    async getAllAtividades(){
        try {
            const data = await atividadeRepository.getAllAtividades();
            return data;
        } catch (error) {
            console.error('Erro ao buscar atividades:', error);
            throw new Error('Não foi possível buscar as atividades.');
        }
    }
    async create(body){
        try{
            const createAtividadeDto = createAtividadeDto_data(body);
            
            const created_at = new Date();

            const atividade = {
                rotina_id: createAtividadeDto.rotina_id,
                cor: createAtividadeDto.cor,
                titulo: createAtividadeDto.titulo,
                descricao: createAtividadeDto.descricao,
                data_inicio: createAtividadeDto.data_inicio,
                data_fim: createAtividadeDto.data_fim,
                duracao: createAtividadeDto.duracao,
                criado_em: created_at
            }   

            const result = await atividadeRepository.createAtividade(atividade)
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
    async updateFull(id, body) {
        try {
            const updateAtividadeDto = updateAtividadeDto_data(body);

            const atividade = {
                rotina_id: updateAtividadeDto.rotina_id,
                cor: updateAtividadeDto.cor,
                titulo: updateAtividadeDto.titulo,
                descricao: updateAtividadeDto.descricao,
                data_inicio: updateAtividadeDto.data_inicio,
                data_fim: updateAtividadeDto.data_fim,
                duracao: updateAtividadeDto.duracao
            }   

            const updated = await atividadeRepository.updateFullAtividade(id, atividade);
    
            if (!updated) {
                return {
                    error: true,
                    message: 'Atividade não encontrada'
                };
            }
    
            return {
                error: false,
                message: 'Atividade atualizada com sucesso',
                body: updated
            };
        } catch (error) {
            return {
                error: true,
                message: error.message
            };
        }
    }
    async delete(id) {
        try {
            const deleted = await atividadeRepository.deleteAtividade(id);
    
            if (!deleted) {
                return {
                    error: true,
                    message: 'Atividade não encontrada'
                };
            }
    
            return {
                error: false,
                message: 'Atividade deletada com sucesso'
            };
        } catch (error) {
            return {
                error: true,
                message: error.message
            };
        }
    }
}

module.exports = new AtividadeController();
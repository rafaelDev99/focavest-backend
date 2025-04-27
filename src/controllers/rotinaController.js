const rotinaRepository = require('../infra/repository/rotina/rotina');

class RotinaController {
    async getRotinaById(id){
        return await rotinaRepository.getRotinaById(id);
    }
    async getRotinasByUsuario(usuarioId){
        const result = await rotinaRepository.getRotinasByUsuario(usuarioId);

        const rotinasDto = result.reduce((acc, row) => {
            let rotina = acc.find(r => r.rotina_id === row.rotina_id);
            if(!rotina){
                rotina = {
                    id: row.rotina_id,
                    nome: row.rotina_nome,
                    descricao: row.rotina_descricao,
                    materia: row.rotina_materia,
                    topico: row.rotina_topico,
                    data: row.rotina_data,
                    atividades: []
                }
                acc.push(rotina);
            }

            rotina.atividades.push({
                id: row.atividade_id,
                titulo: row.atividade_titulo,
                cor: row.atividade_cor,
                descricao: row.atividade.descricao,
                dataInicio: row.atividade_data_inicio,
                dataFim: row.atividade_data_fim,
                duracao: row.atividade_duracao,
                check_task: row.atividade_check_task
            });
        }, []);

        return rotinasDto;
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

    async getProgressoByWeekAndUsuarioId(usuarioId){
        const startOfWeek = new Date();
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        const getProgressReq = {
            user_id: id,
            start_of_week: startOfWeek,
            end_of_week: endOfWeek
        }

        const result = rotinaRepository.getProgressoByWeekAndUsuairio(getProgressReq);
        return result;
    }
}

module.exports = new RotinaController();
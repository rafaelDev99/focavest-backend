const updateRotinaDto_data = require('../dto/rotina/updateRotinaDto');
const rotinaRepository = require('../infra/repository/rotina/rotina');

class RotinaController {
    async getRotinaById(id){
        return await rotinaRepository.getRotinaById(id);
    }
    async getRotinasByUsuario(usuarioId){
        try{
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
                    descricao: row.atividade_descricao,
                    dataInicio: row.atividade_data_inicio,
                    dataFim: row.atividade_data_fim,
                    duracao: row.atividade_duracao,
                    check_task: row.atividade_check_task
                });

                return acc;
            }, []);

            return {
                error: false,
                message: "Rotinas buscadas com sucesso!",
                body: rotinasDto
            }
        }catch(err){
            return {
                error: true,
                message: err.message,
                body: null
            }
        }
    }
    async createRotina(body){
        const createRotinaDto = body;
        const rotina = {
            nome: createRotinaDto.nome,
            descricao: createRotinaDto.descricao,
            materia: createRotinaDto.materia,
            topico: createRotinaDto.topico,
            data: createRotinaDto.data,
            usuario_id: createRotinaDto.usuarioId
        }
        return await rotinaRepository.createRotina(rotina)
    }

    async updateRotina(id,body){

        if(!id){
            return {
                error: true,
                message: "ID da rotina é obrigatorio!",
                body: null
            }
        }

        try {
            const updateRotinaDto = updateRotinaDto_data(body);

            const updatedFields = {};
    
            if (updateRotinaDto.nome) updatedFields.nome = updateRotinaDto.nome;
            if (updateRotinaDto.descricao) updatedFields.descricao = updateRotinaDto.descricao;
            if (updateRotinaDto.materia) updatedFields.materia = updateRotinaDto.materia;
            if (updateRotinaDto.topico) updatedFields.topico = updateRotinaDto.topico;
            if (updateRotinaDto.data) updatedFields.data = updateRotinaDto.data;

            const result = await rotinaRepository.updateRotina(id, updatedFields);
            return {
                error: false,
                message: "Rotina alterada com sucesso!",
                body: result
            }
        } catch (err) {
            return {
                error: true,
                message: err.message,
                body: null
            }
        }
    }

    async getProgressoByWeekAndUsuarioId(usuarioId){
        const startOfWeek = new Date();
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        const getProgressReq = {
            user_id: usuarioId,
            start_of_week: startOfWeek,
            end_of_week: endOfWeek
        }

        try{
            const result = await rotinaRepository.getProgressoByWeekAndUsuairio(getProgressReq);
            return {
                error: false,
                message: "progresso retornado com sucesso",
                body: result
            }
        }catch(err){
            return {
                error: true,
                message: err.message,
                body: null
            }
        }
    }
}

module.exports = new RotinaController();
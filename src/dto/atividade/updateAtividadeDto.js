function updateAtividadeDto_data(body) {
    const { rotina_id, cor, titulo, descricao, data_inicio, data_fim } = body;
    const fieldsToUpdate = {};

    if (rotina_id !== undefined) {
        if (typeof rotina_id !== 'string') {
            throw new Error('Id de rotina deve ser uma string');
        }
        fieldsToUpdate.rotina_id = rotina_id;
    }

    if (cor !== undefined) {
        if (typeof cor !== 'string') {
            throw new Error('Cor deve ser uma string');
        }
        fieldsToUpdate.cor = cor;
    }

    if (titulo !== undefined) {
        if (typeof titulo !== 'string') {
            throw new Error('Título deve ser uma string');
        }
        fieldsToUpdate.titulo = titulo;
    }

    if (descricao !== undefined) {
        if (typeof descricao !== 'string') {
            throw new Error('Descrição deve ser uma string');
        }
        fieldsToUpdate.descricao = descricao;
    }

    let dataInicioRecebida;
    let dataFimRecebida;

    if (data_inicio !== undefined) {
        dataInicioRecebida = new Date(data_inicio);
        if (isNaN(dataInicioRecebida.getTime())) {
            throw new Error('Data de início inválida');
        }
        fieldsToUpdate.data_inicio = dataInicioRecebida;
    }

    if (data_fim !== undefined) {
        dataFimRecebida = new Date(data_fim);
        if (isNaN(dataFimRecebida.getTime())) {
            throw new Error('Data de fim inválida');
        }
        fieldsToUpdate.data_fim = dataFimRecebida;
    }

    if (data_inicio !== undefined && data_fim !== undefined) {
        const duracaoEmMinutos = Math.floor((dataFimRecebida - dataInicioRecebida) / (1000 * 60));
        if (duracaoEmMinutos < 0) {
            throw new Error('Data de fim não pode ser antes da data de início');
        }
        fieldsToUpdate.duracao = duracaoEmMinutos;
    }

    return fieldsToUpdate;
}

module.exports = updateAtividadeDto_data;

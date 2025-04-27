function createAtividadeDto_data(body) {
    const { rotina_id, cor, titulo, descricao, data_inicio, data_fim } = body;

    const dataInicioRecebida = new Date(data_inicio);
    const dataFimRecebida = new Date(data_fim);

    if (!data_inicio) {
        throw new Error('Data de início é obrigatória');
    }
    if (isNaN(dataInicioRecebida.getTime())) {
        throw new Error('Data de início inválida');
    }
    if (!data_fim) {
        throw new Error('Data de fim é obrigatória');
    }
    if (isNaN(dataFimRecebida.getTime())) {
        throw new Error('Data de fim inválida');
    }
    if (!rotina_id || typeof rotina_id !== 'string') {
        throw new Error('Id de rotina é obrigatório');
    }
    if (!cor || typeof cor !== 'string') {
        throw new Error('Cor é obrigatória');
    }
    if (!titulo || typeof titulo !== 'string') {
        throw new Error('Título é obrigatório');
    }
    if (!descricao || typeof descricao !== 'string') {
        throw new Error('Descrição é obrigatória');
    }

    const duracaoEmMinutos = Math.floor((dataFimRecebida - dataInicioRecebida) / (1000 * 60));

    if (duracaoEmMinutos < 0) {
        throw new Error('Data de fim não pode ser antes da data de início');
    }

    return {
        rotina_id,
        cor,
        titulo,
        descricao,
        data_inicio: dataInicioRecebida,
        data_fim: dataFimRecebida,
        duracao: duracaoEmMinutos
    };
}

module.exports = createAtividadeDto_data;
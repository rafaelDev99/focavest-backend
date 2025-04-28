function updateRotinaDto_data(body){
    const {
        nome,
        descricao,
        materia,
        topico,
        data
    } = body;

    if(nome !== undefined && typeof nome !== 'string'){
        throw new Error('nome deve ser uma string');
    }
    if(descricao !== undefined && typeof descricao !== 'string'){
        throw new Error('descricao deve ser uma string');
    }
    if(materia !== undefined && typeof materia !== 'string'){
        throw new Error('materia deve ser uma string');
    }
    if(topico !== undefined && typeof topico !== 'string'){
        throw new Error('topico deve ser uma string');
    }
    if(topico !== undefined && typeof topico !== 'string'){
        throw new Error('topico deve ser uma string');
    }
    if (data !== undefined) {
        const date = new Date(data);
        if (isNaN(date.getTime())) {
            throw new Error('date deve ser uma data string valida');
        }
    }

    return {
        nome: nome,
        descricao: descricao,
        materia: materia,
        topico: topico,
        data: data
    }
}

module.exports = updateRotinaDto_data;

function createRotinaDto_data(body){
    const { 
        nome,
        descricao, 
        materia,
        topico,
        data,
        usuarioId 
    } = body;


    if (!nome || typeof nome !== 'string') {
        throw new Error('Nome é obrigatório');
    }
    if (!descricao || typeof descricao !== 'string') {
        throw new Error('descricao é obrigatório');
    }
    if (!materia || typeof materia !== 'string') {
        throw new Error('descricao é obrigatório');
    }
    if (!topico || typeof topico !== 'string') {
        throw new Error('topico é obrigatório');
    }
    if (!descricao || typeof descricao !== 'string') {
        throw new Error('descricao é obrigatório');
    }
    if (!usuarioId || typeof usuarioId !== 'string') {
        throw new Error('id do usuario é obrigatório');
    }
    if(!data){
        throw new Error('data é obrigatorio');
    }
    if (data !== undefined) {
        
        const date = new Date(data);
        if (isNaN(date.getTime())) {
            throw new Error('date deve ser uma data string valida');
        }
    }

    return  {
        nome: nome,
        descricao: descricao,
        materia: materia,
        topico: topico,
        data: data,
        usuario_id: usuarioId
    }
}

module.exports = createRotinaDto_data;
function updateVestibularDto_data(body) {
    const { data, pfp, uni, curso, site } = body;

    const updateData = {};

    if (data !== undefined) {
        const dataRecebida = new Date(data);
        if (isNaN(dataRecebida.getTime())) {
            throw new Error('Data inválida');
        }
        updateData.data = dataRecebida;
    }

    if (pfp !== undefined) {
        if (typeof pfp !== 'string') {
            throw new Error('PFP deve ser uma string');
        }
        updateData.pfp = pfp;
    }

    if (uni !== undefined) {
        if (typeof uni !== 'string') {
            throw new Error('Uni deve ser uma string');
        }
        updateData.uni = uni;
    }

    if (curso !== undefined) {
        if (typeof curso !== 'string') {
            throw new Error('Curso deve ser uma string');
        }
        updateData.curso = curso;
    }

    if (site !== undefined) {
        if (typeof site !== 'string') {
            throw new Error('Site deve ser uma string');
        }
        updateData.site = site;
    }

    return updateData;
}

module.exports = updateVestibularDto_data;

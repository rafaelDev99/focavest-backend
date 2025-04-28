function updateUsuarioDto_data(body) {
    const { nome, email, idade, cidade, cursos_desejados, image_url } = body;

    const updateData = {};

    if (nome !== undefined) {
        if (typeof nome !== 'string') {
            throw new Error('nome deve ser uma string');
        }
        updateData.nome = nome;
    }

    if (idade !== undefined) {
        if (typeof idade !== 'number') {
            throw new Error('idade deve ser um número');
        }
        updateData.idade = idade;
    }

    if (email !== undefined) {
        if (typeof email !== 'string') {
            throw new Error('email deve ser uma string');
        }
        updateData.email = email;
    }

    if (cidade !== undefined) {
        if (typeof cidade !== 'string') {
            throw new Error('cidade deve ser uma string');
        }
        updateData.cidade = cidade;
    }
    if (image_url !== undefined) {
        if (typeof image_url !== 'string') {
            throw new Error('image_url deve ser uma string');
        }
        updateData.image_url = image_url;
    }
    if (cursos_desejados !== undefined) {
        if (!Array.isArray(cursos_desejados) || !cursos_desejados.every(item => typeof item === 'string')) {
            throw new Error('Cursos Desejados deve ser uma lista string');
        }
        updateData.cursos_desejados = cursosDesejados;
    }

    return updateData;
}

module.exports = updateUsuarioDto_data;

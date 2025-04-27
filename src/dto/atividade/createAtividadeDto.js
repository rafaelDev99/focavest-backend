function createAtividadeDto_data(body) {
    const { data, pfp, uni, curso, site } = body;

    const dataRecebida = new Date(data);
  
    if (!data) {
      throw new Error('Data é obrigatória');
    }
    if (isNaN(dataRecebida.getTime())) {
      throw new Error('Data inválida');
    }
    if (!uni || typeof uni !== 'string') {
      throw new Error('Uni é origatória');
    }
    if (!curso || typeof curso !== 'string') {
      throw new Error('Curso é origatório');
    }
    if (!site || typeof site !== 'string') {
      throw new Error('Site é origatório');
    }
  
    return {
      data: dataRecebida,
      pfp,
      uni,
      curso,
      site
    };
}
  
module.exports = createAtividadeDto_data;
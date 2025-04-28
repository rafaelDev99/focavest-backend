function createUsuarioDto_data(body) {
    const { nome, email, senha, idade, cidade, cursos_desejados, image_url } = body;
  
    if (!nome || typeof nome !== 'string') {
      throw new Error('Nome é obrigatório');
    }
    if (!email || typeof email !== 'string') {
      throw new Error('Email é obrigatório');
    }
    if (!senha || typeof senha !== 'string' || senha.length < 6) {
      throw new Error('A senha precisa ter no mínimo 6 caracteres');
    }
    if (!idade || typeof idade !== 'number') {
      throw new Error('idade é obrigatório');
    }
    if (!cidade || typeof cidade !== 'string') {
      throw new Error('cidade é obrigatório');
    }
  
    return {
      nome: nome,
      email: email,
      senha: senha,
      idade: idade,
      cidade: cidade,
      cursos_desejados: cursos_desejados || [],
      image_url: image_url || ''
    };
}
  
module.exports = createUsuarioDto_data;
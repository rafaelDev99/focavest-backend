function createUsuarioDto_data(body) {
    const { nome, email, senha } = body;
  
    if (!nome || typeof nome !== 'string') {
      throw new Error('Nome é obrigatório');
    }
    if (!email || typeof email !== 'string') {
      throw new Error('Email é obrigatório');
    }
    if (!senha || typeof senha !== 'string' || senha.length < 6) {
      throw new Error('A senha precisa ter no mínimo 6 caracteres');
    }
  
    return {
      nome: nome,
      email: email,
      senha
    };
}
  
module.exports = createUsuarioDto_data;
  

// {
//     "nome": "Usuario1",
//     "email": "teste@usuario1.com",
//     "senha": "123456"
// }
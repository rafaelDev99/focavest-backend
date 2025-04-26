const usuarioRepository = require('../infra/repository/usuario/usuario')

class UsuarioControlller {
    async getUsuarioById(id){
        return await usuarioRepository.getUsuarioById(id);
    }
    async getUsuarioByEmail(email){
        return await usuarioRepository.getUsuarioByEmail(email);
    }
    async getAllUsuario(){
        return await usuarioRepository.getAllUsuario();
    }
}

module.exports = new UsuarioControlller();
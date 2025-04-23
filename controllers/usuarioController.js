const usuarioRepository = require('../infra/repository/usuario/usuario')

class UsuarioControlller {
    async getUsuarioById(usuarioId){

    }
    async getAllUsuario(){
        return await usuarioRepository.getAllUsuario();
    }
}

module.exports = new UsuarioControlller();
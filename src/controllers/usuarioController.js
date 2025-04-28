const usuarioRepository = require('../infra/repository/usuario/usuario')

class UsuarioController {
    async getUsuarioById(id){
        return await usuarioRepository.getUsuarioById(id);
    }
    async getUsuarioByEmail(email){
        return await usuarioRepository.getUsuarioByEmail(email);
    }
    async getAllUsuario(){
        return await usuarioRepository.getAllUsuario();
    }
    async updateUsario(id, body){
        try {
            const updateUsuarioDto = updateUsuarioDto_data(body);
    
            const updatedFields = {};
    
            if (updateUsuarioDto.nome) updatedFields.nome = updateUsuarioDto.nome;
            if (updateUsuarioDto.idade) updatedFields.idade = updateUsuarioDto.idade;
            if (updateUsuarioDto.cidade) updatedFields.cidade = updateUsuarioDto.cidade;
            if (updateUsuarioDto.email) updatedFields.email = updateUsuarioDto.email;
            if (updateUsuarioDto.cursos_desejados) updatedFields.cursos_desejados = updateUsuarioDto.cursos_desejados;
    
            const result = await usuarioRepository.updateUsuario(id, updatedFields);
    
            return {
                error: false,
                message: 'Usuario updated successfully!',
                body: result,
            };
        } catch (err) {
            return {
                error: true,
                message: err.message,
                body: null,
            };
        }
    }
}

module.exports = new UsuarioController();
const sql = require('../../../config/db')

class UsuarioRepository{
    async getAllUsuario() {
        const users = await sql`
          select id, nome, email, tipo_usuario
          from usuario
        `
        return users
    }
}

module.exports = new UsuarioRepository();



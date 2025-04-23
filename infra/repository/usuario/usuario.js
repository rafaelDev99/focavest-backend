const sql = require('../../../config/db')

class UsuarioRepository{
    async createUsuario(usuario){
      const {
        id,
        nome,
        email,
        tipo_usuario,
        criado_em,
        password_hash
      } = usuario;

      const result = await sql`
        INSERT INTO usuario (id, nome, email, tipo_usuario, criado_em, password_hash)
        VALUES (${id}, ${nome}, ${email}, ${tipo_usuario}, ${criado_em}, ${password_hash})
        RETURNING id, nome, email
      `;

      return result[0];
    }
    async getAllUsuario() {
        const users = await sql`
          select id, nome, email, tipo_usuario
          from usuario
        `
        return users
    }
    async getUsuarioByEmail(email){
      const result = await sql`
        SELECT id, nome, email, tipo_usuario 
        FROM usuario 
        WHERE email = ${email}
      `;
      return result[0];
    }
}

module.exports = new UsuarioRepository();



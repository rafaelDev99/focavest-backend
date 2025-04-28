const sql = require('../../../config/db')

class UsuarioRepository{
    async createUsuario(usuario){
      const {
        nome,
        email,
        tipo_usuario,
        criado_em,
        password_hash,
        idade,
        cidade,
        cursos_desejados,
        image_url
      } = usuario;

      const result = await sql`
        INSERT INTO usuario (nome, email, tipo_usuario, criado_em, password_hash, idade, cidade, cursos_desejados, image_url)
        VALUES (${nome}, ${email}, ${tipo_usuario}, ${criado_em}, ${password_hash}, ${idade}, ${cidade}, ${cursos_desejados}, ${image_url})
        RETURNING id, nome, email, idade, cidade, cursos_desejados, image_url, criado_em
      `;

      return result[0];
    }
    async getAllUsuario() {
        const users = await sql`
          select id, nome, email, tipo_usuario, idade, cidade, cursos_desejados, image_url
          from usuario
        `
        return users
    }
    async getUsuarioByEmail(email){
      const result = await sql`
        SELECT id, nome, email, tipo_usuario, idade, cidade, cursos_desejados, image_url
        FROM usuario 
        WHERE email = ${email}
      `;
      return result[0];
    }
    async getUsuarioById(id){
      const result = await sql`
        SELECT id, nome, email, tipo_usuario, idade, cidade, cursos_desejados, image_url
        FROM usuario 
        WHERE id = ${id}
      `;
      return result[0];
    }
    async verifyUsuarioByEmail(email){
      const result = await sql`
        SELECT id, nome, email, tipo_usuario, password_hash 
        FROM usuario 
        WHERE email = ${email}
      `;
      return result[0];
    }
    async updateUsuario(id, update){

    }
}

module.exports = new UsuarioRepository();



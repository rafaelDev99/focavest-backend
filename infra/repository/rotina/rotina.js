const sql = require('../../../config/db')

class RotinaRepository{
    async getRotinasByUsuario(email){
        const result = await sql`
          SELECT id, nome, email, tipo_usuario 
          FROM usuario 
          WHERE email = ${email}
        `;
        return result[0];
      }
}
const sql = require('../../../config/db');
const Usuario = require('../../../entities/usuario');

class AlunoRepository{
    async getAllAluno() {
        const users = await sql`
          select a.id, u.nome, u.email, a.meta_estudo, a.cursos_desejados
          from aluno a
          join usuario u on a.usuario_id = u.id
        `
        return users
    }
}

module.exports = new AlunoRepository();
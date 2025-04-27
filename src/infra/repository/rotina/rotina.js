const sql = require('../../../config/db')

class RotinaRepository{
  async getRotinasByUsuario(id){
    const result = await sql`
      SELECT id, nome, descricao, tempo_total, materia, topico, data
      FROM rotina
      WHERE usuario_id = ${id}
    `;
    return result;
  }

  async getRotinaById(id){
    const result = await sql`
      SELECT id, nome, descricao, tempo_total, materia, topico, data
      FROM rotina
      WHERE id = ${id}
    `;
    return result;
  }

  async createRotina(rotina){
    const {
      nome,
      descricao,
      tempo_total,
      materia,
      topico,
      data,
      usuario_id
    } = rotina;
    const result = await sql`
      INSERT INTO rotina (nome, descricao, tempo_total, materia, topico, data, usuario_id)
      VALUES (${nome}, ${descricao}, ${tempo_total}, ${materia}, ${topico}, ${data}, ${usuario_id})
      RETURNING id, nome, descricao, tempo_total, materia, topico, data
    `;
    return result;
  }
}
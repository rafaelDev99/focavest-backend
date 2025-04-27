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

  async getProgressoByWeekAndUsuairio(reqObj){
    const{
      id,
      start_of_week,
      end_of_week
    }=reqObj;
    const result = await sql`
      SELECT id as rotina_id, 
        SUM(a.duracao) as tempo_total, 
        SUM(CASE WHEN a.check_task = true THEN a.duracao ELSE 0 END) as tempo_estudado,
        (SUM(CASE WHEN a.check_task = true THEN a.duracao ELSE 0 END) / SUM(a.duracao)) * 100 as percentagem
      FROM rotina r
      JOIN atividade a ON a.rotina_id = r.id
      WHERE r.id = ${id} AND r.data BETWEEN ${start_of_week} AND ${end_of_week}
      GROUP BY r.id
    `;

    return result[0];
  }

  async getRotinaById(id){
    const result = await sql`
      SELECT id, nome, descricao, materia, topico, data
      FROM rotina
      WHERE id = ${id}
    `;
    return result[0];
  }

  async createRotina(rotina){
    const {
      nome,
      descricao,
      materia,
      topico,
      data,
      usuario_id
    } = rotina;
    const result = await sql`
      INSERT INTO rotina (nome, descricao, materia, topico, data, usuario_id)
      VALUES (${nome}, ${descricao}, ${materia}, ${topico}, ${data}, ${usuario_id})
      RETURNING id, nome, descricao, tempo_total, materia, topico, data
    `;
    return result;
  }
}

module.exports = new RotinaRepository();
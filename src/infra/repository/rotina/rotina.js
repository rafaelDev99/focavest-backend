const sql = require('../../../config/db')

class RotinaRepository{
  async getRotinasByUsuario(id){
    const result = await sql`
      SELECT 
        r.id as rotina_id, 
        r.nome as rotina_nome, 
        r.descricao as rotina_descricao,
        r.materia as rotina_materia, 
        r.topico as rotina_topico, 
        r.data as rotina_data,
        a.id as atividade_id,
        a.titulo as atividade_titulo,
        a.cor as atividade_cor,
        a.descricao as atividade_descricao,
        a.data_inicio as atividade_data_inicio,
        a.data_fim as atividade_data_fim,
        a.duracao as atividade_duracao,
        a.check_task as atividade_check_task
      FROM rotina r
      LEFT JOIN atividade a ON a.rotina_id = r.id
      WHERE r.usuario_id = ${id}
    `;
    return result;
  }

  async getProgressoByWeekAndUsuairio(reqObj){
    const{
      user_id,
      start_of_week,
      end_of_week
    }=reqObj;
    const result = await sql`
      SELECT r.id as rotina_id, 
        SUM(a.duracao) as tempo_total_semanal, 
        SUM(CASE WHEN a.check_task = true THEN a.duracao ELSE 0 END) as tempo_estudado,
        (SUM(CASE WHEN a.check_task = true THEN a.duracao ELSE 0 END) / SUM(a.duracao)) * 100 as percentagem
      FROM rotina r
      JOIN atividade a ON a.rotina_id = r.id
      WHERE r.usuario_id = ${user_id} AND r.data BETWEEN ${start_of_week} AND ${end_of_week}
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

  async updateRotina(id, fieldsToUpdate){
    if (Object.keys(fieldsToUpdate).length === 0) {
      throw new Error('Nenhum campo para atualizar foi enviado');
    }
  
    const keys = Object.keys(fieldsToUpdate);
    const values = Object.values(fieldsToUpdate);

    const setClause = keys.map((key, idx) => `${key} = $${idx + 1}`).join(', ');

    const result = await sql.unsafe(
      `UPDATE rotina SET ${setClause} WHERE id = $${keys.length + 1} 
      RETURNING id, nome, descricao, materia, topico`,
      [...values, id]
    );

    console.log(result[0]);
    return result[0];
  }
  async deleteRotina(id){

  }
}

module.exports = new RotinaRepository();
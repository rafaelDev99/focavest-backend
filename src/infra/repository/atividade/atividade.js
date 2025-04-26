const sql = require('../../../config/db')

class AtividadeRepository{
    async createAtividade(atividade){
      const {
        rotina_id,
        cor,
        descricao,
        data_inicio,
        criado_em,
        data_fim
      } = atividade;

      const result = await sql`
        INSERT INTO atividade (rotina_id, cor, descricao, data_inicio, criado_em, data_fim)
        VALUES (${rotina_id}, ${cor}, ${descricao}, ${data_inicio}, ${criado_em}, ${data_fim})
        RETURNING id, rotina_id, cor, descricao, data_inicio, criado_em, data_fim
      `;

      return result[0];
    }
    async getAllAtividades() {
        const atividades = await sql`
          select id, rotina_id, cor, descricao, data_inicio, criado_em, data_fim
          from atividade
        `
        return atividades
    }
    async getAtividadesByRotinaId(rotinaId){
      const result = await sql`
        SELECT id, rotina_id, cor, descricao, data_inicio, criado_em, data_fim
        FROM atividade 
        WHERE rotina_id = ${rotinaId}
      `;
      return result[0];
    }
    async getAtividadeById(id){
      const result = await sql`
        SELECT id, rotina_id, cor, descricao, data_inicio, criado_em, data_fim
        FROM atividade 
        WHERE id = ${id}
      `;
      return result[0];
    }
}

module.exports = new AtividadeRepository();



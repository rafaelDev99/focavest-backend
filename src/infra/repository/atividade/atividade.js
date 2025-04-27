const sql = require('../../../config/db')

class AtividadeRepository{
    async createAtividade(atividade){
      const {
        rotina_id,
        cor,
        titulo,
        descricao,
        data_inicio,
        criado_em,
        data_fim,
        duracao
      } = atividade;

      const result = await sql`
        INSERT INTO atividade (rotina_id, cor, titulo, descricao, data_inicio, criado_em, data_fim, duracao)
        VALUES (${rotina_id}, ${cor}, ${titulo}, ${descricao}, ${data_inicio}, ${criado_em}, ${data_fim}, ${duracao})
        RETURNING id, rotina_id, cor, titulo, descricao, data_inicio, data_fim, duracao, criado_em
      `;

      return result[0] || {};
    }
    async getAllAtividades() {
        const result = await sql`
          SELECT id, rotina_id, cor, titulo, descricao, data_inicio, data_fim, duracao, criado_em
          FROM atividade
        `
        return result || [];
    }
    async getAtividadesByRotinaId(rotinaId) {
      const result = await sql`
        SELECT id, rotina_id, cor, titulo, descricao, data_inicio, data_fim, duracao, criado_em
        FROM atividade 
        WHERE rotina_id = ${rotinaId}
      `;

      return result || [];
    }
    async getAtividadeById(id) {
      const result = await sql`
        SELECT id, rotina_id, cor, titulo, descricao, data_inicio, data_fim, duracao, criado_em
        FROM atividade 
        WHERE id = ${id}
      `;
      return result[0] || {};
    }
    async updateFullAtividade(id, data) {
      if (!id) {
          throw new Error('ID da atividade é obrigatório');
      }
  
      const { cor, titulo, descricao, data_inicio, data_fim, duracao } = data;
  
      const result = await sql`
          UPDATE atividade
          SET 
              cor = ${cor},
              titulo = ${titulo},
              descricao = ${descricao},
              data_inicio = ${data_inicio},
              data_fim = ${data_fim},
              duracao = ${duracao}
          WHERE id = ${id}
          RETURNING id, cor, titulo, descricao, data_inicio, data_fim, duracao
      `;
  
        return result[0] || {};
    }
    async deleteAtividade(id) {
        if (!id) {
            throw new Error('ID da atividade é obrigatório');
        }
    
        const result = await sql`
            DELETE FROM atividade
            WHERE id = ${id}
            RETURNING id
        `;
    
        return result[0] || {};
    }
}

module.exports = new AtividadeRepository();



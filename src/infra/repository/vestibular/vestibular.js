const sql = require('../../../config/db')

class VestibularRepository{
    async createVestibular(vestibular){
      const {
        data,
        pfp,
        uni,
        curso,
        site,
        criado_em,
      } = vestibular;

      const result = await sql`
        INSERT INTO vestibular (data, pfp, uni, curso, site, criado_em)
        VALUES (${data}, ${pfp}, ${uni}, ${curso}, ${site}, ${criado_em})
        RETURNING id, data, pfp, uni, curso, site, criado_em
      `;

      return result[0] || {};
    }
    async getAllVestibulares() {
        const result = await sql`
          select id, data, pfp, uni, curso, site, criado_em
          from vestibular
        `
        return result || [];
    }
    async getVestibularById(id){
      const result = await sql`
        SELECT id, data, pfp, uni, curso, site, criado_em
        FROM vestibular 
        WHERE id = ${id}
      `;
      return result[0] || {};
    }
    async updateVestibular(id, fieldsToUpdate) {
      if (!id) {
        throw new Error('ID do vestibular é obrigatório');
      }
    
      if (Object.keys(fieldsToUpdate).length === 0) {
        throw new Error('Nenhum campo para atualizar foi enviado');
      }
    
      const keys = Object.keys(fieldsToUpdate);
      const values = Object.values(fieldsToUpdate);
    
      const setClause = keys.map((key, idx) => `${key} = $${idx + 1}`).join(', ');
 
      const result = await sql.unsafe(
        `UPDATE vestibular SET ${setClause} WHERE id = $${keys.length + 1} 
        RETURNING id, data, pfp, uni, curso, site, criado_em`,
        [...values, id]
      );
    
      return result[0] || {};
    }    
    async deleteVestibular(id) {
      if (!id) {
          throw new Error('ID do vestibular é obrigatório');
      }
  
      const result = await sql`
          DELETE FROM vestibular
          WHERE id = ${id}
          RETURNING id
      `;
  
      return result[0] || {};
    }  
}

module.exports = new VestibularRepository();
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

      return result[0];
    }
    async getAllVestibulares() {
        const vestibulares = await sql`
          select id, data, pfp, uni, curso, site, criado_em
          from vestibular
        `
        return vestibulares
    }
    async getVestibularById(id){
      const result = await sql`
        SELECT id, data, pfp, uni, curso, site, criado_em
        FROM vestibular 
        WHERE id = ${id}
      `;
      return result[0];
    }
}

module.exports = new VestibularRepository();



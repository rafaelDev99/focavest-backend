const sql = require("../../../config/db");

class VestibularUsuarioRepository {
  async associarVestibularUsuario(usuario_id, vestibular_id) {
    const created_at = new Date();

    const result = await sql`
            INSERT INTO vestibular_usuario (usuario_id, vestibular_id, created_at)
            VALUES (${usuario_id}, ${vestibular_id}, ${created_at})
            RETURNING id, usuario_id, vestibular_id, created_at
        `;

    return result[0];
  }

  async getVestibularesByUsuarioId(usuario_id) {
    const result = await sql`
            SELECT v.*
            FROM vestibular_usuario vu
            INNER JOIN vestibular v ON vu.vestibular_id = v.id
            WHERE vu.usuario_id = ${usuario_id}
        `;
    return result;
  }

  async getProximoVestibularByUsuarioId(usuario_id) {
    const result = await sql`
            SELECT v.*
            FROM vestibular_usuario vu
            INNER JOIN vestibular v ON vu.vestibular_id = v.id
            WHERE vu.usuario_id = ${usuario_id}
              AND v.data >= NOW()
            ORDER BY v.data ASC
            LIMIT 1
        `;
    return result[0];
  }
}

module.exports = new VestibularUsuarioRepository();

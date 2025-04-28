const vestibularUsuarioRepository = require("../infra/repository/vestibularUsuario/vestibularUsuario");

class VestibularUsuarioController {
  async associarVestibularUsuario(usuario_id, vestibular_id) {
    try {
      const association =
        await vestibularUsuarioRepository.associarVestibularUsuario(
          usuario_id,
          vestibular_id
        );

      return {
        error: false,
        message: "Vestibular associado ao usuário com sucesso!",
        body: association,
      };
    } catch (err) {
      return {
        error: true,
        message: err.message,
        body: null,
      };
    }
  }

  async getVestibularesByUsuario(usuarioId) {
    try {
      const vestibulares =
        await vestibularUsuarioRepository.getVestibularesByUsuarioId(usuarioId);

      return {
        error: false,
        message: "Vestibulares carregados com sucesso",
        body: vestibulares,
      };
    } catch (err) {
      return {
        error: true,
        message: err.message,
        body: null,
      };
    }
  }

  async getProximoVestibular(usuarioId) {
    try {
      const vestibular =
        await vestibularUsuarioRepository.getProximoVestibularByUsuarioId(
          usuarioId
        );

      return {
        error: false,
        message: "Vestibular mais próximo carregado com sucesso",
        body: vestibular,
      };
    } catch (err) {
      return {
        error: true,
        message: err.message,
        body: null,
      };
    }
  }
}

module.exports = new VestibularUsuarioController();

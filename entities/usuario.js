//  EXEMPLO DE ENTIDADE

class Usuario {
    constructor(
        userId, 
        nomeCompleto, 
        email, 
        hashSenha, 
        telefone, 
        role, 
        area, 
        horario,
        cursos,
        tarefas,
        documentos) {
        this.userId = userId;
        this.nomeCompleto = nomeCompleto;
        this.email = email;
        this.hashSenha = hashSenha;
        this.telefone = telefone;
        this.role = role;
        this.area = area;
        this.horario = horario;
        this.tarefas = tarefas;
        this.documentos = documentos;
        this.cursos = cursos;
    }
}

module.exports = Usuario;
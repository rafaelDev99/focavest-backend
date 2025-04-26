class Usuario {
    constructor(
        id, 
        nome, 
        email, 
        password_hash,  
        tipo_usuario,
        criado_em,
    ) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.password_hash = password_hash;
        this.tipo_usuario = tipo_usuario;
        this.criado_em = criado_em
    }
}

module.exports = Usuario;
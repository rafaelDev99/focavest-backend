class Atividade {
    constructor(
        id, 
        rotina_id, 
        cor, 
        descricao,  
        data_inicio,
        data_fim,
        criado_em,
    ) {
        this.id = id;
        this.rotina_id = rotina_id;
        this.cor = cor;
        this.descricao = descricao;
        this.data_inicio = data_inicio;
        this.data_fim = data_fim;
        this.criado_em = criado_em;
    }
}

module.exports = Atividade;
class Atividade {
    constructor(
        id, 
        rotina_id, 
        cor, 
        descricao,  
        data_inicio,
        criado_em,
        data_fim
    ) {
        this.id = id;
        this.rotina_id = rotina_id;
        this.cor = cor;
        this.descricao = descricao;
        this.data_inicio = data_inicio;
        this.criado_em = criado_em;
        this.data_fim = data_fim;
    }
}

module.exports = Atividade;
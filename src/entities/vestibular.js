class Vestibular {
    constructor(
        id, 
        data, 
        pfp, 
        uni,  
        curso,
        site,
        criado_em,
    ) {
        this.id = id;
        this.data = data;
        this.pfp = pfp;
        this.uni = uni;
        this.curso = curso;
        this.site = site;
        this.criado_em = criado_em
    }
}

module.exports = Vestibular;
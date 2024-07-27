export class Usuario{
    public id: string;
    public nome: string;
    public email: string;
    public senha: string;
    public datanasc: string;

    constructor(obj?: Partial<Usuario>){
        if (obj){
            this.id =       obj.id
            this.nome =     obj.nome
            this.email =    obj.email
            this.senha =    obj.senha
            this.datanasc = obj.datanasc
        }
    }

    toString(){
        const objeto=`{
            "id":       "${this.id}",
            "nome":     "${this.nome}",
            "email":    "${this.email}",
            "senha":    "${this.senha}",
            "datanasc": "${this.datanasc}"
        }`
        return objeto
    }

    toFirestore(){
        const usuario={
            id:       this.id,
            nome:     this.nome,
            email:    this.email,
            senha:    this.senha,
            datanasc: this.datanasc
        }
        return usuario
    }


}
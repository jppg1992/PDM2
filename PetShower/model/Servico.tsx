export class Servico {
  public id: string;
  public descricao: string;
  public valor: number;

  constructor(obj?: Partial<Servico>) {
    if (obj) {
      this.id = obj.id;
      this.descricao = obj.descricao;
      this.valor = obj.valor;
    }
  }

  toString() {
    const objeto = `{
            "id":       "${this.id}",
            "descricao":     "${this.descricao}",
            "valor":     "${this.valor}",
           
        }`;
    return objeto;
  }

  toFirestore() {
    const servico = {
      id: this.id,
      descricao: this.descricao,
      valor: this.valor,
    };
    return servico;
  }
}

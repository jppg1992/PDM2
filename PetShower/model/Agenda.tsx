export class Agenda {
  public id: string;
  public servico: string;
  public cachorro: string;
  public data: string;

  constructor(obj?: Partial<Agenda>) {
    if (obj) {
      this.id = obj.id;
      this.servico = obj.servico;
      this.cachorro = obj.cachorro;
      this.data = obj.data;
    }
  }

  toString() {
    const objeto = `{
            "id":       "${this.id}", 
            "servico":     "${this.servico}",
            "cachorro":     "${this.cachorro}",
            "data": "${this.data}",
           
        }`;
    return objeto;
  }

  toFirestore() {
    const agenda = {
      id: this.id,
      servico: this.servico,
      cachorro: this.cachorro,
      data: this.data,
    };
    return agenda;
  }
}

export class Cachorro {
  public id: string;
  public nome: string;
  public sexo: string;
  public datanasc: string;
  public raca: string;

  constructor(obj?: Partial<Cachorro>) {
    if (obj) {
      this.id = obj.id;
      this.nome = obj.nome;
      this.raca = obj.raca;
      this.sexo = obj.sexo;
      this.datanasc = obj.datanasc;
    }
  }

  toFirestore() {
    const cachorro = {
      id: this.id,
      nome: this.nome,
      raca: this.raca,
      sexo: this.sexo,
      datanasc: this.datanasc,
    };
    return cachorro;
  }

  toString() {
    const Objeto = `{
            "id": "${this.id}",
            "nome": "${this.nome}",
            "raca": "${this.raca}",
            "sexo": "${this.sexo}",
            "datanasc": "${this.datanasc}", 
        }`;

    return Objeto;
  }
}

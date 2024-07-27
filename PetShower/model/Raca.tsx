export class Raca{
    public id: string;
    public raca: string;

    constructor(obj?: Partial<Raca>){
        if (obj){
            this.id =       obj.id
            this.raca =     obj.raca
        }
    }

    toString(){
        const objeto=`{
            "id":       "${this.id}",
            "raca":     "${this.raca}",
        }`
        return objeto
    }

    toFirestore(){
        const raca={
            id:       this.id,
            raca:     this.raca,
        }
        return raca
    }


}
export class Marcador {
    public titulo: string;
    public desc: string;
    public lat: number;
    public lng: number;

    constructor( lat: number, lng: number ) {
        this.titulo = 'Sin título';
        this.desc = 'Sin Descripción';
        this.lat = lat;
        this.lng = lng;
    }
}

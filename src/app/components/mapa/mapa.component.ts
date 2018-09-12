import { Component } from '@angular/core';
import { Marcador } from '../../classes/marcador.class';
import {MatSnackBar} from '@angular/material';
import {MatDialog} from '@angular/material';
import { MapaEditarComponent } from './mapa-editar.component';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent {
  marcadores: Marcador[] = [];
  lat = 10.3686532;
  lng = -85.7689888;

  constructor(public snackBar: MatSnackBar, public dialog: MatDialog) {
    if (localStorage.getItem('marcadores')) {
      this.marcadores = JSON.parse(localStorage.getItem('marcadores'));
    }
   }

  agregarMarcador(evento) {
    const coords: {lat: number, lng: number}  = evento.coords;
    const nuevoMarcador = new Marcador(coords.lat, coords.lng);
    this.marcadores.push(nuevoMarcador);
    this.guardarStorage();
    this.snackBar.open('Marcador agregado', 'Cerrar', {duration: 4000});
  }

  guardarStorage() {
    localStorage.setItem('marcadores', JSON.stringify(this.marcadores));
  }

  borrarMarcador(i: number) {
    this.marcadores.splice(i, 1);
    this.guardarStorage();
    this.snackBar.open('Marcador eliminado', 'Cerrar', {duration: 4000});
  }

  editarMarcador(marcador: Marcador): void {
    console.log('Datos enviados:', marcador);
    const dialogRef = this.dialog.open(MapaEditarComponent, {
      width: '250px',
      data: {titulo: marcador.titulo, desc: marcador.desc}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        marcador.titulo = result.titulo;
        marcador.desc = result.desc;
        this.guardarStorage();
        this.snackBar.open('Marcador actualizado', 'Cerrar', {duration: 4000});
        console.log('Datos recibidos: ', marcador);
      }
    });
  }
}

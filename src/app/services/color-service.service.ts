import { Injectable } from '@angular/core';
import { producto } from '../interfaces/producto';


@Injectable({
  providedIn: 'root'
})
export class ColorServiceService {

  color = localStorage.getItem('color') ? localStorage.getItem('color') : 'todos';
  constructor() { }

  getColor(){
    return this.color;
  }
  setColor(colorFiltro){
    this.color = colorFiltro;
    localStorage.setItem('color',this.color);
  }

}

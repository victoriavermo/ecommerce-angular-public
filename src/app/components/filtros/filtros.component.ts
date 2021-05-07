import { Component, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { Filter} from '../../interfaces/filter';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss']
})
export class FiltrosComponent implements OnInit {


  @Output() filtrarProductos = new EventEmitter<Filter>();
  colores=['todos','negro','marron','azul','rojo','bordo','blanco','verde'];
  categoria=['todos','bolso','billetera','riñonera','neceser'];

  texto:string;
  // floatLabelControl = new FormControl('auto');

  selected = 'todos';

  tipoAux = [];
  colorAux = [];

  value: number = 0;
  highValue: number = 100;
  options: Options = {
    floor: 0,
    ceil: 200
  };


  filtro:Filter={
    precio:{
      precioMax: this.highValue,
      precioMin: this.value
    },
    texto:'',
    color:'todos',
    tipo:'todos'
  };

  constructor() {
    this.tipoAux = [this.filtro.tipo];

  }

  ngOnInit(): void {
    this.filtro.precio.precioMax = localStorage.getItem('precioMax') ? parseInt(localStorage.getItem('precioMax')) : this.highValue;
    this.highValue = this.filtro.precio.precioMax;

    this.filtro.precio.precioMin = localStorage.getItem('precioMin') ? parseInt(localStorage.getItem('precioMin')) : this.value;
    this.value = this.filtro.precio.precioMin;


    this.filtro.texto = localStorage.getItem('texto') ? localStorage.getItem('texto') : this.filtro.texto;
    this.texto = this.filtro.texto;
    this.filtro.color = localStorage.getItem('color') ? localStorage.getItem('color') : this.filtro.color;


    this.filtro.tipo = localStorage.getItem('tipo') ? localStorage.getItem('tipo') : this.filtro.tipo;
    this.tipoAux = [this.filtro.tipo];

    console.log('PRECIO CARGADO', this.filtro)
  }
  changeText(texto){
    console.log('EV-Texto',texto);
    this.filtro.texto = this.texto;
    this.filtrarProductos.emit(this.filtro);

    localStorage.setItem('texto', this.texto);
  }
  changeSliderUpperPrice(ev){
    console.log('EV-pmax',ev);
    this.filtro.precio.precioMax = ev;
    this.filtrarProductos.emit(this.filtro);

    localStorage.setItem('precioMax', this.filtro.precio.precioMax.toString());
  }
  changeSliderLowerPrice(ev){
    console.log('EV',ev);
    this.filtro.precio.precioMin = ev;
    this.filtrarProductos.emit(this.filtro);

    localStorage.setItem('precioMin', this.filtro.precio.precioMin.toString());

  }
  changeColor(ev){
    console.log('color:',ev.currentTarget.value);
    this.filtro.color = ev.currentTarget.value;
    this.filtrarProductos.emit(this.filtro);

    localStorage.setItem('color', this.filtro.color);
  }
  changeCategory(ev){
    console.log('categoria:',ev.option.value);
    this.filtro.tipo = ev.option.value;
    this.filtrarProductos.emit(this.filtro);
    localStorage.setItem('tipo', this.filtro.tipo);
  }



}

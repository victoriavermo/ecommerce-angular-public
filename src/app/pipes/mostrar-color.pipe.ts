import { Pipe, PipeTransform } from '@angular/core';
import { producto } from '../interfaces/producto';

@Pipe({
  name: 'mostrarColor'
})
export class MostrarColorPipe implements PipeTransform {

  transform(prod: producto, auxColor): unknown {
    const nombre = prod.url;
    if(auxColor === 'todos'){
      return prod.img[0];
    }else{
      const colorElegido = prod.url+'_'+auxColor+'.jpeg';
      return colorElegido;
    }

  }

}

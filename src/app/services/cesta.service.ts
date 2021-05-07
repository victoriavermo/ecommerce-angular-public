import { Injectable } from '@angular/core';
import { cestaItem } from '../interfaces/cestaItem';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CestaService {

  productos:cestaItem[] = localStorage.getItem('arrayCesta') ? JSON.parse(localStorage.getItem('arrayCesta')) : [];

  //Los observables acaban en $ -> nombreObservable$
  // private precioObservable$ = new BehaviorSubject<number>(0);
  private precioObservable$ = new BehaviorSubject<number>(localStorage.getItem('importePagar') ? parseInt(localStorage.getItem('importePagar')) : 0);
  importeFinal$ = this.precioObservable$.asObservable();


  cambiarTotalAPagar(importeFinal){
    this.precioObservable$.next(importeFinal);
  }

  precioFinal(cestaItem: any){
    // Si existe precioOferta, retornara el precio oferta si no el precio normal.
    return cestaItem.precioOferta || cestaItem.precio ;
  }

  getProductos(): cestaItem[]{
    return this.productos;
  }
  setProductos(productos: cestaItem[]){
    this.productos = [...productos];
  }

  addProductoToArray(producto:cestaItem){
    /*
    /Consultamos el indice para ver si ya esta del array
    const index = this.productos.indexOf(producto);
    //Si esta  dentro el indice mas pequeño sera 0.
    console.log('indice coincide',index);
    if(index >= 0){
      this.productos[index].cantidad += producto.cantidad;
    }else{
      //Insertamos producto nuevo.
      this.productos.push(producto);
    }
    */

    // 1 primero tenemos que buscar si en el array coinciden las 2 ids
    const indiceConFind = this.productos.findIndex((productoParam:cestaItem)=> `${productoParam.color}-${productoParam.id}` === `${producto.color}-${producto.id}`)
    console.log('indice con metodo find', indiceConFind);
    if( indiceConFind >= 0 ){
      // elemento existe en el erray
      // si coinciden, cojo ese elemento del array y en cantidad le sumo lo que me vien en el parametro
      this.productos[indiceConFind].cantidad += producto.cantidad;
    }else{
      // no coinciden las 2 ids
      this.productos.push(producto);
    }

    //Sumamos precio y añadir el importe final
    const importeFinal = this.calcularImporteFinal();
    this.cambiarTotalAPagar(importeFinal);
  }

  deleteProductOfArray(item:cestaItem){

    const i = this.productos.indexOf(item);
    this.productos.splice(i, 1);

    //Restamos precio
    const importeFinal = this.calcularImporteFinal();
    this.cambiarTotalAPagar(importeFinal);
  }
  calcularImporteFinal():number{
    let sumatorio = 0;
    this.productos.forEach((producto: cestaItem)=>{
    sumatorio += ( this.precioFinal(producto) * producto.cantidad ) ///producto.
    })
    return sumatorio;
  }

  vaciarCesta(){
    this.productos = [];
    this.calcularImporteFinal();
    localStorage.setItem('arrayCesta',undefined);
  }
}

import { Component, OnInit, ɵCodegenComponentFactoryResolver } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { producto } from '../../interfaces/producto';
import { Filter } from '../../interfaces/filter';
import { CestaService } from '../../services/cesta.service';
import { ColorServiceService } from '../../services/color-service.service';
import { cestaItem } from '../../interfaces/cestaItem';
import {style, state, animate, transition, trigger} from '@angular/animations';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({opacity:0}),
        animate(500, style({opacity:1}))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(500, style({opacity:0}))
      ])
    ])
  ]
})
export class ProductosComponent implements OnInit {


  productos:producto[]=[];
  productosMostrar:producto[]=[];
  elementosFavoritos:producto[]=localStorage.getItem('favoritos') ? JSON.parse(localStorage.getItem('favoritos')) : [];
  auxProd;
  auxColor = 'todos';
  minis;
  prodActual;

  constructor( private db: AngularFirestore,
               private router: Router,
               private cestaServ : CestaService,
               private colorServ: ColorServiceService )
  {
    this.minis = false;
  }


  ngOnInit(): void {

    //Conexion BBDD
    this.db.collection('productos').valueChanges().subscribe((res)=>{
      this.productos = res as producto[];
      // this.productosMostrar = this.productos;
      this.filtrarProductos({
        precio:{
          precioMax: localStorage.getItem('precioMax') ? parseInt(localStorage.getItem('precioMax')) : 100,
          precioMin: localStorage.getItem('precioMin') ? parseInt(localStorage.getItem('precioMin')) : 0
        },
        tipo: localStorage.getItem('tipo') ? localStorage.getItem('tipo') : 'todos',
        color: localStorage.getItem('color') ? localStorage.getItem('color') : 'todos',
        texto: localStorage.getItem('texto') ? localStorage.getItem('texto') : ''
      });
          //Cargo LocalStorage de Favoritos i actualizo los estados de true/false
      this.productosMostrar.forEach(element => {
        this.elementosFavoritos.forEach( eFav => {
          if(eFav.url === element.url){
            element.fav=true;
          }
        });
      });

    }
    );



  }





  navegar(index:number){
    console.log('index',index);
    this.router.navigate(['detail',index]);
  }

  filtrarProductos(filtro:Filter){

    console.log('filtro que viene del hijo Filtro',filtro);
    this.auxColor = filtro.color;
    this.colorServ.setColor(filtro.color);

    //Filtramos el texto
    const arrayFiltrandoTexto = this.filtrarTexto(this.productos,filtro);
    //Filtramos precio
    const arrayFiltrandoPrecio = this.filtrarPrecio(arrayFiltrandoTexto,filtro);
    //Filtramos color
    const arrayFiltrandoColor = this.filtrarColor(arrayFiltrandoPrecio,filtro);
    //Filtramos categoria
    const arrayFiltrandoCat = this.filtrarCategoria(arrayFiltrandoColor,filtro);
    this.productosMostrar  = [...arrayFiltrandoCat];

  }

  filtrarTexto(arrayP:producto[],filtro:Filter):producto[]{
    const texto = filtro.texto;
    if(texto){
      return arrayP.filter((producto:producto)=>{
        const nombre = producto.nombre.toLowerCase().trim();
        return nombre.includes(texto.toLowerCase().trim());
      })
    }else{
      return arrayP;
    }

  }

  filtrarPrecio(arrayP:producto[],filtro:Filter):producto[]{
    const precioMax = filtro.precio.precioMax;
    const precioMin = filtro.precio.precioMin;

    return arrayP.filter((producto: producto)=>{
      const precioDeEsteProducto = this.cestaServ.precioFinal(producto);
      return ( precioDeEsteProducto > precioMin ) && ( precioDeEsteProducto < precioMax)
    })

  }
  filtrarColor(arrayP:producto[],filtro:Filter):producto[]{
    const color = filtro.color;
    if(color && (color !== 'todos')){
      return arrayP.filter((producto:producto)=>{
        const arrayDeColoresDisponibles = producto.colores;
        return arrayDeColoresDisponibles.includes(color);
      })
    }else{
      return arrayP;
    }

  }

  filtrarCategoria(arrayP:producto[],filtro:Filter):producto[]{
    let tipo = filtro.tipo;
    if(tipo && (tipo !== 'todos')){
      return arrayP.filter((producto:producto)=>{
        if(tipo == 'riñonera'){
          tipo = 'rinonera';
        }
        return producto.categoria === tipo;
      })
    }else{
      return arrayP;
    }
  }




  listaFav(e,prod:producto) {

    console.log('favoritos-flag',prod.fav);
    /*if(this.elementosFavoritos.length !== 0){
      if(this.elementosFavoritos.includes(prod)){
        this.removeFavorite(prod);
      }else{
        this.addFavorite(prod);
      }
    }else{
      this.addFavorite(prod);
    }*/

    if(prod.fav){
      this.removeFavorite(prod);
    }else{
      this.addFavorite(prod);
    }

    e.stopPropagation();

  }

  addFavorite(producto: producto){
    this.elementosFavoritos.push( producto);
    producto.fav = true;

    // console.log('ELEMENTOS FAVORITOS', this.elementosFavoritos)
    localStorage.setItem('favoritos', JSON.stringify(this.elementosFavoritos));

  }

  removeFavorite(producto:producto){

    const index = this.elementosFavoritos.indexOf(producto);
    this.elementosFavoritos.splice(index, 1);
    producto.fav = false;

    localStorage.setItem('favoritos', JSON.stringify(this.elementosFavoritos));

  }

  // mostrarColor(producto:producto){
  //   const nombre = producto.url;
  //   if(this.auxColor === 'todos'){
  //     return producto.img[0];
  //   }else{
  //     const colorElegido = producto.url+'_'+this.auxColor+'.jpeg';
  //     return colorElegido;
  //   }
  // }

  mostrarMinis(producto:producto){
    if(this.minis && producto.url==this.prodActual){
      return true;
    }else{
      false;
    }

    // return this.minis ? true : false;
  }

}

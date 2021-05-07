import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { CestaService } from 'src/app/services/cesta.service';
import { cestaItem } from '../../interfaces/cestaItem';
import { producto } from '../../interfaces/producto';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ColorServiceService } from 'src/app/services/color-service.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.scss']
})
export class DetalleProductoComponent implements OnInit {

  idProducto;
  producto:producto;
  color:string;
  cantidad:number = 1; // que consultara si ya hay algo en cesta de este producto y este color
  showAgregar:boolean = false;
  showPagar:boolean = false;
  stocks:any;
  auxColor = 'todos';

  constructor( private router: Router,
               private afs: AngularFirestore,
               private cestaServ: CestaService,
               private _snackBar:MatSnackBar,
               private colorServ: ColorServiceService) { }

  ngOnInit(): void {
    console.log('split',this.router.url.split('/'));
    this.idProducto = this.router.url.split('/')[2]; //Para coger el 3er elemento necesito en indice 2.

    console.log('Id producto',this.idProducto);

    this.afs.collection('productos').doc(this.idProducto).get().toPromise().then((productoDelaBaseDeDatos)=>{

      console.log('DATA', productoDelaBaseDeDatos.data());
      this.producto = productoDelaBaseDeDatos.data() as producto;
    })

    this.cestaServ.importeFinal$.subscribe((importeFinal: number)=>{
      this.showPagar = ( importeFinal > 0 ) ? true : false;
    })

    this.afs.collection('stocks').doc(this.idProducto).get().toPromise().then((res)=>{
      console.log('stocks', res.data());
      this.stocks = res.data();
    })
    this.auxColor = this.colorServ.getColor();

    // if(this.colorServ.getColor()){
    //   this.auxColor = this.colorServ.getColor();
    // }else{
    //   this.auxColor = 'todos'
    // }

    console.log('color del servicio',this.colorServ.getColor());
  }

  navegarTienda(){
    this.router.navigateByUrl('products');
  }

  navegarPago(){
    this.router.navigateByUrl('pasarela');
  }
  seleccionoColor(color:string){
    console.log('COLOR', color);
    this.color = color;
    this.auxColor = color;
    // primero miro si en la cesta ya habia algun elemento de esa id y
    this.showAgregarF();
  }

  agregar(){
    console.log('Agregar');
    const item:cestaItem = {
      id: this.idProducto,
      color: this.color,
      cantidad: this.cantidad,
      precio: this.producto.precio,
      precioOferta: this.producto.precioOferta
    }


    // console.log('cestaItem', item);
    // this.cestaServ.addProductoToArray(item);
    // this._snackBar.open('Producto añadido!',null,{duration:1500});
    // // JSON.stringify()
    // this.guardarLocalStorage();
    // JSON.stringify()

  // primero necesito saber cuantos elementos hay previamente en la cesta
  const cestaProductos = this.cestaServ.getProductos();

  const elementoPrevioEnCesta = cestaProductos.find((item:cestaItem)=>{
    return ( item.color === this.color) && (item.id === this.idProducto )
  })

  const elementosMaximosStock = this.stocks[ this.color ];
  // cuantos elementos maximos de este producto hay en stock;
  const totalCantidad = elementoPrevioEnCesta ? elementoPrevioEnCesta.cantidad + this.cantidad : this.cantidad

  const hayElementosSuficientesEnStock: boolean = (( totalCantidad) <= elementosMaximosStock )




  if( ! hayElementosSuficientesEnStock ){
    // si no tengo insuficientes elementos en stock
    this._snackBar.open('No hay suficientes elementos en stock contactenos para saber existencias', null, {
    duration: 1000
  });
  }else{
    this.cestaServ.addProductoToArray(item);
    this.guardarLocalStorage();
    this._snackBar.open('¡Producto añadido exitosamente!', null, {
      duration: 1000
    });
  }

}
  add(){
    // si de ese elemento quedan mas items en el stock, te dejo añadir //si no,
    // idProducto

    const cantidadDeEsteProductoEnStock = this.stocks[ this.color ]; //4
    console.log('CANTIDAD DE ESTE PRODUCTO EN STOCK', cantidadDeEsteProductoEnStock);
    const hayMasElementos: boolean = ( cantidadDeEsteProductoEnStock > this.cantidad );
    if( hayMasElementos){
      this.cantidad += 1;
      this.showAgregarF();
    }else{
      this._snackBar.open('No hay más productos de esa selección', null, {duration: 1000})
    }

  }

  remove(){
    console.log('remove');
    //quitar1
      /*
      if( this.cantidad === 0){
        return
      }else{
        this.cantidad -=1;
      } */
    this.cantidad === 0 ? null : this.cantidad -=1;
    this.showAgregarF();
    // this._snackBar.open('¡Producto quitado!',null,{duration:1500});

  }

  showAgregarF(){
    if(this.cantidad > 0){
      this.showAgregar = true;
    }else{
      this.showAgregar = false;
    }
  }

  guardarLocalStorage(){
    const arrayCesta = this.cestaServ.getProductos();
    console.log('STRINGIFIED ARRAYCESTA', JSON.stringify(arrayCesta));
    localStorage.setItem('arrayCesta', JSON.stringify(arrayCesta))
  }

  cambiarImg(img){
    const colorMini = img.split('_')[1].split('.')[0]
    //this.colorServ.setColor(colorMini);
    this.auxColor = colorMini;
    

  }

}

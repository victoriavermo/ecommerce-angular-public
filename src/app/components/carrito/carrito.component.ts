import { Component, OnInit } from '@angular/core';
import { CestaService } from '../../services/cesta.service';
import { cestaItem } from '../../interfaces/cestaItem';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {

  constructor(private cestaServ: CestaService, private _snackBar:MatSnackBar) { }

  productos: cestaItem[] = [];


  ngOnInit(): void {
    this.productos = this.cestaServ.getProductos();

  }

  deleteItem(cestaItem:cestaItem){
    console.log('CESTA ITEM',cestaItem);
    //eliminamos el elemento de la cesta
    this.cestaServ.deleteProductOfArray(cestaItem);
    this.guardarLocalStorage();


    this._snackBar.open('¡Producto quitado!',null,{duration:1500});
  }

  guardarLocalStorage(){
    const arrayCesta = this.cestaServ.getProductos();
    console.log('STRINGIFIED ARRAYCESTA', JSON.stringify(arrayCesta));
    localStorage.setItem('arrayCesta', JSON.stringify(arrayCesta));
  }

}

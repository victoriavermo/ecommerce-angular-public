import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { render } from 'creditcardpayments/creditCardPayments';
import { CestaService } from 'src/app/services/cesta.service';
import * as firebase from 'firebase';
import { cestaItem } from 'src/app/interfaces/cestaItem';

@Component({
  selector: 'app-pasarela',
  templateUrl: './pasarela.component.html',
  styleUrls: ['./pasarela.component.scss']
})
export class PasarelaComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  // dataObject = {
  //   nombre : (localStorage.getItem('dataObject') ? localStorage.getItem('dataObject') : null),
  //   apellido1 : (localStorage.getItem('apellido1') ? localStorage.getItem('apellido1') : null),
  //   apellido2 : (localStorage.getItem('apellido2') ? localStorage.getItem('apellido2') : null),
  //   telefono : (localStorage.getItem('telefono') ? localStorage.getItem('telefono') : null),
  //   email : (localStorage.getItem('email') ? localStorage.getItem('email') : null),
  //   direccion: (localStorage.getItem('direccion') ? localStorage.getItem('direccion') : null),
  //   ciudad: (localStorage.getItem('ciudad') ? localStorage.getItem('ciudad') : null),
  //   cp: (localStorage.getItem('cp') ? localStorage.getItem('cp') : null)

  // }


  importePagar:number ;
  paid:boolean = false;
  idDocumento: string = ( localStorage.getItem('id') ) ? localStorage.getItem('id') : null;


  constructor(private router:Router, private location:Location, private _formBuilder: FormBuilder, private db:AngularFirestore , private cestaServ: CestaService) {

   }

  ngAfterViewInit(){
    render({
        id: '#myPaypalButtons',
        currency: 'EUR',
        value: `${this.importePagar}`,//Importar valor del observable importeAPagar
        onApprove: (details)=>{
          console.log('COBRO EXITOSO', details);
          console.log(this.idDocumento);
          this.paid = true,
          this.db.collection('pedidos').doc(this.idDocumento).set({
            paid: true,
            precioFinal: this.importePagar,
            cestaCompra: this.cestaServ.getProductos()
          }, {merge: true})//En el set es importante hacer el merge para no sobreescribir el documento.
          this.actualizarStocks();
          this.cestaServ.vaciarCesta();
          alert('COBRO EXITOSO');
       }
    })
  }

  ngOnInit(){

    const dataObject = JSON.parse(localStorage.getItem('dataObject')) ? JSON.parse(localStorage.getItem('dataObject')) : '';

    this.firstFormGroup = this._formBuilder.group({

      nombre: [ dataObject.nombre , [ Validators.required, Validators.maxLength(100) ] ] ,
      apellido1: [ dataObject.apellido1 , [ Validators.required, Validators.maxLength(100) ] ] ,
      apellido2: [ dataObject.apellido2, [ Validators.required, Validators.maxLength(100) ] ] ,
      direccion: [ dataObject.direccion, [ Validators.required, Validators.maxLength(1000) ] ],
      telefono: [ dataObject.telefono, [ Validators.required ] ],
      email: [ dataObject.email, [ Validators.required, Validators.email ] ]

    });

    this.secondFormGroup = this._formBuilder.group({
      direccion: [ dataObject.direccion , [ Validators.required, Validators.maxLength(100) ] ] ,
      ciudad: [ dataObject.ciudad, [ Validators.required, Validators.maxLength(100) ] ] ,
      cp: [ dataObject.cp , [ Validators.required, Validators.maxLength(100) ] ]

    });

    this.cestaServ.importeFinal$.subscribe((imp:number)=>
    {
      this.importePagar = imp;
    }
    )


  }

  navegarTienda(){
    this.router.navigateByUrl('products');
  }

  volver(){
    this.location.back();
  }
  async guardar(){
      //1. Extraer datos
      const data = this.firstFormGroup.value;
      // const data = this.firstFormGroup.getRawValue();
      const data2 = this.secondFormGroup.value;
      let info = {...data, ...data2};
      console.log(info);


      // AQUI GUARDO EL DATO EN LOCALSTORAGE
      localStorage.setItem('dataObject', JSON.stringify(info));

      //2. Guardar a la bbdd
      // Insertarlos en la base de datos.
      const idObject = await this.db.collection('pedidos').add(info);
      console.log('ID', idObject.id);
      this.idDocumento = idObject.id;
      localStorage.setItem('id', this.idDocumento);


  }

  actualizarStocks(){
    // que necesito saber:
    const cestaProductos = this.cestaServ.getProductos();

    cestaProductos.forEach((item:cestaItem) => {

          const color = item.color; // marron
          const id = item.id; // brooklyn
          const cantidad = item.cantidad; // 10
          // brooklyn-azul-10
          console.log('DENTRO BUCLE, DATOS',{
            color, id, cantidad
          })

          this.db.collection('stocks').doc(id).set(
            {
            [color]: firebase.default.firestore.FieldValue.increment( - cantidad  )
          },
          { merge: true }
          ).then((res)=>{
            console.log('UPDATE RESPUESTA', res)
          })
    })

    // reducir elementos de la coleccion de stocks

  }


}

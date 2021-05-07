import { Component, OnInit } from '@angular/core';
import { CestaService } from '../../services/cesta.service';

@Component({
  selector: 'app-importe-pagar',
  templateUrl: './importe-pagar.component.html',
  styleUrls: ['./importe-pagar.component.scss']
})
export class ImportePagarComponent implements OnInit {

  
  importePagar:number = 0;
  constructor(private cestaServ:CestaService) { }

  ngOnInit(): void {
    this.cestaServ.importeFinal$.subscribe((imp:number)=>{
      this.importePagar = imp;
      localStorage.setItem('importePagar',imp.toString());
    })
  }



}

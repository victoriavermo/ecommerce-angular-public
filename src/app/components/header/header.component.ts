import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent{

  title = 'Tienda Bolsos';

  constructor(private route: Router) {}

  pasarela(){
    this.route.navigateByUrl("pasarela");
    // this.flag = false;
  }

  home(){
    this.route.navigateByUrl("products");
  }
}

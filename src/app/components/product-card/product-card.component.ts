import { Component, Input, OnInit } from '@angular/core';
import { cestaItem } from '../../interfaces/cestaItem';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product: cestaItem;

  constructor() { }

  ngOnInit(): void {
  }

}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { DetalleProductoComponent } from './pages/detalle-producto/detalle-producto.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { PasarelaComponent } from './pages/pasarela/pasarela.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { TestHttpComponent } from './pages/testHttp/test-http/test-http.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
    path: 'contact',
    component: ContactoComponent
  },
  {
    path: 'detail/:id',
    component: DetalleProductoComponent
  },
  {
    path: 'products',
    component: ProductosComponent
  },
  {
    path: 'pasarela',
    component: PasarelaComponent
  },
  {
    path: 'productTest',
    component: ProductCardComponent
  },
  {
    path: 'test',
    component: TestHttpComponent
  },
  {
    path: '**',
    redirectTo: 'products',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

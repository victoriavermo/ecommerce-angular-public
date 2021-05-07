import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Angular Material
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button'
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list'
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatStepperModule} from '@angular/material/stepper';
import { MatChipsModule } from '@angular/material/chips';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { ProductosComponent } from './pages/productos/productos.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { PasarelaComponent } from './pages/pasarela/pasarela.component';
import { DetalleProductoComponent } from './pages/detalle-producto/detalle-producto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CarritoComponent } from './components/carrito/carrito.component';
import { ImportePagarComponent } from './components/importe-pagar/importe-pagar.component';
import { HeaderComponent } from './components/header/header.component';
import { FiltrosComponent } from './components/filtros/filtros.component';
//
import { environment } from '../environments/environment';

import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { MostrarColorPipe } from './pipes/mostrar-color.pipe';
import { TestHttpComponent } from './pages/testHttp/test-http/test-http.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    ContactoComponent,
    PasarelaComponent,
    DetalleProductoComponent,
    CarritoComponent,
    ImportePagarComponent,
    HeaderComponent,
    FiltrosComponent,
    ProductCardComponent,
    MostrarColorPipe,
    TestHttpComponent
  ],
  imports: [
    //Angular Material
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatChipsModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatSelectModule,
    NgxSliderModule,
    //Firebase
    AngularFireModule.initializeApp(environment.config),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

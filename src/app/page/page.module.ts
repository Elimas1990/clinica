import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';
import { BienvenidoComponent } from './bienvenido/bienvenido.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { DataTablesModule } from 'angular-datatables';
import { SesionModule } from '../sesion/sesion.module';


@NgModule({
  declarations: [
    BienvenidoComponent,
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    DataTablesModule,
    SesionModule
  ]
})
export class PageModule { }

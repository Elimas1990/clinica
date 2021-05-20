import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';
import { BienvenidoComponent } from './bienvenido/bienvenido.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    BienvenidoComponent,
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    DataTablesModule
  ]
})
export class PageModule { }

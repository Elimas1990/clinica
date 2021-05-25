import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';
import { BienvenidoComponent } from './bienvenido/bienvenido.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { DataTablesModule } from 'angular-datatables';
import { SesionModule } from '../sesion/sesion.module';
import { PerfilComponent } from './perfil/perfil.component';


@NgModule({
  declarations: [
    BienvenidoComponent,
    UsuariosComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    DataTablesModule,
    SesionModule
  ]
})
export class PageModule { }

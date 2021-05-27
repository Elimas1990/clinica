import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';
import { BienvenidoComponent } from './bienvenido/bienvenido.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { DataTablesModule } from 'angular-datatables';
import { SesionModule } from '../sesion/sesion.module';
import { PerfilComponent } from './perfil/perfil.component';
import { HorariosComponent } from './perfil/horarios/horarios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SolicitarturnoComponent } from './solicitarturno/solicitarturno.component';
import { FilterPipe } from '../pipes/filter.pipe';



@NgModule({
  declarations: [
    BienvenidoComponent,
    UsuariosComponent,
    PerfilComponent,
    HorariosComponent,
    SolicitarturnoComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    DataTablesModule,
    SesionModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PageModule { }

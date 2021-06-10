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
import { VerturnosComponent } from './solicitarturno/verturnos/verturnos.component';
import { GeneralModule } from '../general/general.module';
import { EspecialidadComponent } from './solicitarturno/especialidad/especialidad.component';
import { ProfesionalComponent } from './solicitarturno/profesional/profesional.component';
import { TurnosComponent } from './solicitarturno/turnos/turnos.component';
import { MiturnoComponent } from './miturno/miturno.component';
import { TurnopacienteComponent } from './miturno/turnopaciente/turnopaciente.component';
import { TurnoprofesionalComponent } from './miturno/turnoprofesional/turnoprofesional.component';
import { TurnostodosComponent } from './miturno/turnostodos/turnostodos.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { GraficoComponent } from './estadisticas/grafico/grafico.component';



@NgModule({
  declarations: [
    BienvenidoComponent,
    UsuariosComponent,
    PerfilComponent,
    HorariosComponent,
    SolicitarturnoComponent,
    FilterPipe,
    VerturnosComponent,
    EspecialidadComponent,
    ProfesionalComponent,
    TurnosComponent,
    MiturnoComponent,
    TurnopacienteComponent,
    TurnoprofesionalComponent,
    TurnostodosComponent,
    PacientesComponent,
    EstadisticasComponent,
    GraficoComponent,
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    DataTablesModule,
    SesionModule,
    ReactiveFormsModule,
    FormsModule,
    GeneralModule,
    HighchartsChartModule
  ]
})
export class PageModule { }

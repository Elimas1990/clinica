import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosGuard } from '../guards/usuarios.guard';
import { BienvenidoComponent } from './bienvenido/bienvenido.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { MiturnoComponent } from './miturno/miturno.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { PerfilComponent } from './perfil/perfil.component';
import { SolicitarturnoComponent } from './solicitarturno/solicitarturno.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  {path:'',component:BienvenidoComponent,data: { animationState: 'home' }},
  {path:'usuarios',component:UsuariosComponent,canActivate:[UsuariosGuard],data: { animationState: 'usuarios' }},
  {path:'perfil',component:PerfilComponent,data: { animationState: 'perfil' }},
  {path:'solicitarturno',component:SolicitarturnoComponent,data: { animationState: 'solicitarturno' }},
  {path:'miturno',component:MiturnoComponent,data: { animationState: 'miturno' }},
  {path:'pacientes',component:PacientesComponent,data: { animationState: 'pacientes' }},
  {path:'estadisticas',component:EstadisticasComponent,data: { animationState: 'estadisticas' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }

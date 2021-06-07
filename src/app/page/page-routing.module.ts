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
  {path:'',component:BienvenidoComponent},
  {path:'usuarios',component:UsuariosComponent,canActivate:[UsuariosGuard]},
  {path:'perfil',component:PerfilComponent},
  {path:'solicitarturno',component:SolicitarturnoComponent},
  {path:'miturno',component:MiturnoComponent},
  {path:'pacientes',component:PacientesComponent},
  {path:'estadisticas',component:EstadisticasComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }

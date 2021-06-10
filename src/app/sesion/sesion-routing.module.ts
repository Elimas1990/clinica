import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerificaemailComponent } from './verificaemail/verificaemail.component';

const routes: Routes = [
  {path:'login',component:LoginComponent,data: { animationState: 'login' }},
  {path:'register',component:RegisterComponent,data: { animationState: 'register' }},
  {path:'verifica-email',component:VerificaemailComponent,data: { animationState: 'verifica' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SesionRoutingModule { }

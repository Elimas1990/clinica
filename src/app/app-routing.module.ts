import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',loadChildren:()=> import('./page/page.module').then(m=>m.PageModule) },
  {path:'sesion',loadChildren:()=> import('./sesion/sesion.module').then(m=>m.SesionModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';
import { BienvenidoComponent } from './bienvenido/bienvenido.component';


@NgModule({
  declarations: [
    BienvenidoComponent
  ],
  imports: [
    CommonModule,
    PageRoutingModule
  ]
})
export class PageModule { }

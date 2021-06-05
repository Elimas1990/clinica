import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralRoutingModule } from './general-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { HistoriaclinicaComponent } from './historiaclinica/historiaclinica.component';


@NgModule({
  declarations: [
    NavbarComponent,
    HistoriaclinicaComponent
  ],
  imports: [
    CommonModule,
    GeneralRoutingModule
  ],
  exports:[
    NavbarComponent,
    HistoriaclinicaComponent
  ]
})
export class GeneralModule { }

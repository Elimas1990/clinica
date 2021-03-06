import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SesionRoutingModule } from './sesion-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { VerificaemailComponent } from './verificaemail/verificaemail.component';
import { FormularioComponent } from './register/formulario/formulario.component';
import { GeneralModule } from '../general/general.module';
import { RecaptchaModule,RecaptchaFormsModule } from 'ng-recaptcha';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    VerificaemailComponent,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    SesionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    GeneralModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    NgbModule
  ],
  exports:[
    RegisterComponent,
    LoginComponent
  ]
})
export class SesionModule { }

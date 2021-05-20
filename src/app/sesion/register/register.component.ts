import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild,OnInit} from '@angular/core';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AuthService } from 'src/app/servicios/auth.service';
import { Paciente, Profesional } from 'src/app/clases/usuario';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {

  mensajeError=null
  tipoform:boolean=true
  formRegistroPaciente:FormGroup=new FormGroup({
    nombre:new FormControl('',[Validators.required]),
    apellido:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email]),
    edad:new FormControl('',[Validators.required,Validators.min(1),Validators.max(99)]),
    dni:new FormControl('',[Validators.required,Validators.minLength(6)]),
    obrasocial:new FormControl('',[Validators.required]),
    pass:new FormControl('',[Validators.required,Validators.minLength(6)]),
    pass2:new FormControl('',[Validators.required,Validators.minLength(6)]),
    foto1:new FormControl('',[Validators.required]),
    foto2:new FormControl('',[Validators.required])
  },{
    validators:this.validatePass
  })
  formRegistroProfesional:FormGroup=new FormGroup({
    nombre:new FormControl('',[Validators.required]),
    apellido:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email]),
    edad:new FormControl('',[Validators.required,Validators.min(1),Validators.max(99)]),
    dni:new FormControl('',[Validators.required,Validators.minLength(6)]),
    obrasocial:new FormControl('',[Validators.required]),
    pass:new FormControl('',[Validators.required,Validators.minLength(6)]),
    pass2:new FormControl('',[Validators.required,Validators.minLength(6)]),
    especialidad:new FormControl([]),
    foto1:new FormControl('',[Validators.required])
  },{
    validators:this.validatePass
  })

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  especialidadCtrl = new FormControl();
  filteredEspecialidades: Observable<string[]>;
  especialidadElegida: string[] = [];
  especialidades:string[]=['traumatologia','dermatologia','clinico','clinico2','clinico3','pediatria','oncologia']
  usuarioProfesional:Profesional=new Profesional
  usuarioPaciente:Paciente=new Paciente

  @ViewChild('especialidadInput') especialidadInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private authService:AuthService,
    private route:Router) {
    this.filteredEspecialidades = this.especialidadCtrl.valueChanges.pipe(
        startWith(null),
        map((especialidad: string | null) => especialidad ? this._filter(especialidad) : this.especialidades.slice()));
  }

  add(event: MatChipInputEvent): void {
    const valor = (event.value || '').trim();

    if (valor) {
      this.formRegistroProfesional.get('especialidad').value.push(valor)
    }

    //event.chipInput!.clear();

    this.especialidadCtrl.setValue(null);
  }

  remove(especialidad: string): void {
    const index = this.formRegistroProfesional.get('especialidad').value.indexOf(especialidad);
    if (index >= 0) {
      this.formRegistroProfesional.get('especialidad').value.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.formRegistroProfesional.get('especialidad').value.push(event.option.viewValue);
    this.especialidadInput.nativeElement.value = '';
    this.especialidadCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.especialidades.filter(especial => especial.toLowerCase().indexOf(filterValue) === 0);
  }
  ngOnInit(): void {

  }

  async guardarPaciente(formulario){
    try{
      let aRegistrar={pass:''}
      if(this.tipoform){
        this.usuarioPaciente={
          nombre:formulario.getRawValue().nombre,
          apellido:formulario.getRawValue().apellido,
          email:formulario.getRawValue().email,
          pass:formulario.getRawValue().pass,
          edad:formulario.getRawValue().edad,
          dni:formulario.getRawValue().dni,
          obrasocial:formulario.getRawValue().obrasocial,
          img:formulario.getRawValue().foto1,
          img2:formulario.getRawValue().foto2,
          estado:true,
          tipouser:'Paciente'
        }
        aRegistrar=this.usuarioPaciente
       
      }else{
        this.usuarioProfesional={
          nombre:formulario.getRawValue().nombre,
          apellido:formulario.getRawValue().apellido,
          email:formulario.getRawValue().email,
          pass:formulario.getRawValue().pass,
          edad:formulario.getRawValue().edad,
          dni:formulario.getRawValue().dni,
          especialidad:formulario.getRawValue().especialidad,
          img:formulario.getRawValue().foto1,
          estado:false,
          tipouser:'Profesional'
        }
        aRegistrar=this.usuarioProfesional
      }
      let respuesta=this.authService.register(aRegistrar)
      respuesta.then(x => {
        if(x.message){
          this.mensajeError=x.message
        }else{
          this.mensajeError=null
          delete aRegistrar.pass;
          this.authService.create(aRegistrar)
          this.route.navigate(['sesion/verifica-email'])
        }
      })
    }
    catch(error){
      console.log(error)
    }
    
  }

  validatePass(control: AbstractControl):null |object {
    if(control.value.pass2 != control.value.pass){
      return {coinciden: true};
    }
  }

  arrayVacio(control: AbstractControl):null |object {
    
    if(control.value.length == 0){
      return {arrayVacio: false,invalid: true};
    }else{
      return {arrayVacio: true,invalid: false};
    }
  }


}

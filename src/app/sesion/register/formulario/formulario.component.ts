import { animate, style, transition, trigger } from '@angular/animations';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Admin, Paciente, Profesional } from 'src/app/clases/usuario';
import { EspecialidadesService } from 'src/app/servicios/especialidades.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
  animations:[
    trigger(
      'inOutAnimation', 
      [ transition('void => *',  [
            style({transform: 'translateY(100%)', opacity: 0 }),
            animate('1s ease-out', 
              style({ transform: 'translateY(0%)', opacity: 1 }))
        ]),
        transition('* => void', [
            style({ transform: 'translateY(0%)', opacity: 1 }),
            animate('1s ease-in', 
              style({ transform: 'translateY(100%)', opacity: 0 }))
        ])
      ],
      
    )
  ]
})
export class FormularioComponent implements OnInit {

  @Output() volverRegistros:EventEmitter<boolean>= new EventEmitter<boolean>()
  @Output() dataUsuario:EventEmitter<object>= new EventEmitter<object>()

  @Input() set formulario(value) {
    this.addControls(value)
    this.formType=value
  }
  
  formType:string   
  formRegistro:FormGroup

  formBase:FormGroup=new FormGroup({
    nombre:new FormControl('',[Validators.required]),
    apellido:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email]),
    edad:new FormControl('',[Validators.required,Validators.min(1),Validators.max(99)]),
    dni:new FormControl('',[Validators.required,Validators.minLength(6)]),
    pass:new FormControl('',[Validators.required,Validators.minLength(6)]),
    pass2:new FormControl('',[Validators.required,Validators.minLength(6)]),
    foto1:new FormControl('',[Validators.required])
  })

  fileToUpload: File = null;
  fileToUpload2: File = null;
  handleFileInput(files) {
    const idElement=files.target.attributes.id.nodeValue
    const fileData=files.target.files.item(0)
    if(idElement == 'foto1'){
      this.fileToUpload = fileData
    }else{
      this.fileToUpload2 = fileData
    }
    //console.log(idElement)
    //console.log(fileData)
  }
  

  mensajeError=null
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  especialidadCtrl = new FormControl();
  filteredEspecialidades: Observable<string[]>;
  especialidadElegida: string[] = [];
  especialidades:string[]=[]
  usuarioProfesional:Profesional=new Profesional
  usuarioPaciente:Paciente=new Paciente
  usuarioAdmin: Admin=new Admin
  centradoForm:string;
  @ViewChild('especialidadInput') especialidadInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  
  constructor(private fb:FormBuilder,
    private espService:EspecialidadesService) { 
      espService.getAll().subscribe(x => {
        x.forEach(element => {
          console.log(element.especialidad)
          this.especialidades.push(element.especialidad)
          this.filteredEspecialidades = this.especialidadCtrl.valueChanges.pipe(
            startWith(null),
            map((especialidad: string | null) => especialidad ? this._filter(especialidad) : this.especialidades.slice()));
        });
        
      })
    
  }

  ngOnInit(): void {
  }
  
  addControls(formulario){
    switch(formulario){
      case 'paciente':
        this.formRegistro = this.fb.group({
          ...this.formBase.controls,
          foto2: ['', Validators.required],
          obrasocial:['', Validators.required]
        },{
          validators:this.validatePass
        });
        break;
      case 'profesional':
        this.formRegistro = this.fb.group({
          ...this.formBase.controls,
          especialidad:[[]]
        },{
          validators:this.validatePass
        });
        break;
      case 'administracion':
        this.formRegistro = this.fb.group({
          ...this.formBase.controls
        },{
          validators:this.validatePass
        });
        break;
    }
    
  }

  validatePass(control: AbstractControl):null |object {

    if(control.value.pass2 != control.value.pass){
      return {coinciden: true};
    }
    return null
  }

  add(event: MatChipInputEvent): void {
    const valor = (event.value || '').trim();

    if (valor) {
      this.formRegistro.get('especialidad').value.push(valor)
    }

    //event.chipInput!.clear();

    this.especialidadCtrl.setValue(null);
  }

  remove(especialidad: string): void {
    const index = this.formRegistro.get('especialidad').value.indexOf(especialidad);
    if (index >= 0) {
      this.formRegistro.get('especialidad').value.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.formRegistro.get('especialidad').value.push(event.option.viewValue);
    this.especialidadInput.nativeElement.value = '';
    this.especialidadCtrl.setValue(null);
  }

  _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.especialidades.filter(especial => especial.toLowerCase().indexOf(filterValue) === 0);
  }

  async guardarUsuario(formulario){
    let objBase={
      nombre:formulario.getRawValue().nombre,
      apellido:formulario.getRawValue().apellido,
      email:formulario.getRawValue().email,
      pass:formulario.getRawValue().pass,
      edad:formulario.getRawValue().edad,
      dni:formulario.getRawValue().dni,
      img:this.fileToUpload,
      estado:true,
    }
    try{
      let aRegistrar={pass:''}
      switch(this.formType){
        case 'paciente':
          objBase['obrasocial']=formulario.getRawValue().obrasocial
          
          objBase['img2']=this.fileToUpload2

          objBase['tipouser']='Paciente'

          aRegistrar=this.usuarioPaciente
          break;
        case 'profesional':
          objBase['especialidad']=formulario.getRawValue().especialidad
          objBase['licencia']=false
          objBase['tipouser']='Profesional'

          aRegistrar=this.usuarioProfesional
          break;
        case 'administracion':
          objBase['tipouser']='Administrativo'
          aRegistrar=this.usuarioProfesional
          break;
      }
  
      this.dataUsuario.emit(objBase)
      /*let respuesta=this.authService.register(aRegistrar)
      respuesta.then(x => {
        if(x.message){
          this.mensajeError=x.message
        }else{
          this.mensajeError=null
          delete aRegistrar.pass;
          this.authService.create(aRegistrar)
          this.route.navigate(['sesion/verifica-email'])
        }
      })*/
    }
    catch(error){
      console.log(error)
    }
  }

  volver(){
    this.volverRegistros.emit(false)
  }

  probar(){
    
  }
}

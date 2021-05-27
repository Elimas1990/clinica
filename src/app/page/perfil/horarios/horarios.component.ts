import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfhorariosService } from 'src/app/servicios/profhorarios.service';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit {

  @Input() data
  //hora:Array<string>=[]
  //min:Array<string>=['00','30']
  formHorarios:FormGroup=new FormGroup({
    especialidad:new FormControl([Validators.required])
  })

  constructor(private fb:FormBuilder,
    private horarioService:ProfhorariosService) { 
    
  }

  

  ngOnInit(): void {
  }
  controlLunes:boolean=false
  controlMartes:boolean=false
  controlMiercoles:boolean=false
  controlJueves:boolean=false
  controlViernes:boolean=false
  controlSabado:boolean=false

  selecDia(element,control){
    let mostrar:boolean
    if(element.target.classList.contains('btn-primary')){
      element.target.classList.remove('btn-primary')
      mostrar=false
    }else{
      element.target.classList.add('btn-primary')
      mostrar=true
    }
    switch(control){
      case 'L':
        this.controlLunes=mostrar
        this.addOrRemoveControl(mostrar,'lunesDesde','lunesHasta')
        break;
      case 'M':
        this.controlMartes=mostrar
        this.addOrRemoveControl(mostrar,'martesDesde','martesHasta')
        break;
      case 'Mi':
        this.controlMiercoles=mostrar
        this.addOrRemoveControl(mostrar,'miercolesDesde','miercolesHasta')
        break;
      case 'J':
        this.controlJueves=mostrar
        this.addOrRemoveControl(mostrar,'juevesDesde','juevesHasta')
        break;
      case 'V':
        this.controlViernes=mostrar
        this.addOrRemoveControl(mostrar,'viernesDesde','viernesHasta')
        break;
      case 'S':
        this.controlSabado=mostrar
        this.addOrRemoveControl(mostrar,'sabadoDesde','sabadoHasta')
        break;
    }
    
  }

  addOrRemoveControl(mostrar,desde,hasta){
    if(mostrar){
      this.formHorarios.addControl(desde, this.fb.control('', [Validators.required])); 
      this.formHorarios.addControl(hasta, this.fb.control('', [Validators.required])); 
    }else{
      this.formHorarios.removeControl(desde)
      this.formHorarios.removeControl(hasta)
    }
  }

  
  guardarUsuario(){

    let obj=this.formHorarios.getRawValue()
    obj.nombre=this.data.nombre
    obj.apellido=this.data.apellido
    obj.email=this.data.email
    this.horarioService.devolverHorario(obj.email,obj.especialidad)
    .subscribe(x =>{
      if(x.size > 0){
        x.docs.forEach(element => {
          this.horarioService.eliminarSetHorario(element.id)
        })
      }
      this.horarioService.create(obj)
      this.formHorarios.reset()
    })
    
  }

}

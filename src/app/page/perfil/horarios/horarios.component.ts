import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfhorariosService } from 'src/app/servicios/profhorarios.service';
import * as moment from 'moment';
import { Time } from '@angular/common';


@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit {

  @Input() data

  formHorarios:FormGroup=new FormGroup({
    especialidad:new FormControl('',[Validators.required]),
    tiempobloque:new FormControl('',[Validators.required])
  })
  controlLunes:boolean=false
  controlMartes:boolean=false
  controlMiercoles:boolean=false
  controlJueves:boolean=false
  controlViernes:boolean=false
  controlSabado:boolean=false

  espSelect:string

  constructor(private fb:FormBuilder,
    private horarioService:ProfhorariosService) { 
    
  }

  ngOnInit(): void {
  }
  
  mostrarHora(h){
    return(h*3600*1000)+10800000
  }
  setMax(hasta,tiempo){
    if(hasta){
      return hasta-1
    }else{
      return tiempo
    }
  }
  setMin(desde){
    if(desde){
      return desde+1
    }else{
      return 8
    }
  }


  selecEsp(element,control){
    $('.btn-esp').removeClass('btn-primary')
    if(element.target.classList.contains('btn-primary')){
      element.target.classList.remove('btn-primary')
      this.formHorarios.get('especialidad').setValue('')
    }else{
      element.target.classList.add('btn-primary')
      this.formHorarios.get('especialidad').setValue(control)
      this.espSelect=control
    }
   
  }
  selecDia(element,control){
    let mostrar:boolean
    let diasemana:string
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
        diasemana='lunes'
        break;
      case 'M':
        this.controlMartes=mostrar
        diasemana='martes'
        break;
      case 'Mi':
        this.controlMiercoles=mostrar
        diasemana='miercoles'
        break;
      case 'J':
        this.controlJueves=mostrar
        diasemana='jueves'
        break;
      case 'V':
        this.controlViernes=mostrar
        diasemana='viernes'
        break;
      case 'S':
        this.controlSabado=mostrar
        diasemana='sabado'
        break;
    }
    this.addOrRemoveControl(mostrar,diasemana)
    
  }

  addOrRemoveControl(mostrar,diasemana){
    if(mostrar){
      this.formHorarios.addControl(diasemana, this.fb.group({
        'desde': this.fb.control('', [Validators.required]), 
        'hasta': this.fb.control('', [Validators.required])})); 
    }else{
      
      this.formHorarios.removeControl(diasemana)
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
      this.controlLunes=false
      this.controlMartes=false
      this.controlMiercoles=false
      this.controlJueves=false
      this.controlViernes=false
      this.controlSabado=false
      $('.btn-esp').removeClass('btn-primary')
    })
  
  }

}

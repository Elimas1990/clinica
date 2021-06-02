import { Component, OnInit } from '@angular/core';
import { ProfhorariosService } from 'src/app/servicios/profhorarios.service';
import * as moment from 'moment';
import { EspecialidadesService } from 'src/app/servicios/especialidades.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitarturno',
  templateUrl: './solicitarturno.component.html',
  styleUrls: ['./solicitarturno.component.css']
})
export class SolicitarturnoComponent implements OnInit {

  
  //searchText:string
  //searchProfesional:string
  //listaHorarios=[]
  //turnosDe:any
  listaEspecialidades=[]
  //listaProfesionales=[]

  espSelect:any
  profSelect:any

  mostrarEspecialidades=true;
  mostrarProfesionales=false;
  mostrarTurnos=false;


  //mostrarHorarios=false;
  
  constructor(//private horarioService:ProfhorariosService,
    //private route:Router,
    private espService:EspecialidadesService) { 
      espService.getAll()
      .subscribe(x=> {
        this.listaEspecialidades=x
      })
    /*horarioService.getAll()
    .subscribe(x => {
      this.listaHorarios=x
      x.forEach(element => {
        element.apellido
        element.lunes= this.generarTurnos(element.lunesDesde,element.lunesHasta)
        element.martes= this.generarTurnos(element.martesDesde,element.martesHasta)
        element.miercoles= this.generarTurnos(element.miercolesDesde,element.miercolesHasta)
        element.jueves= this.generarTurnos(element.juevessDesde,element.juevesHasta)
        element.viernes= this.generarTurnos(element.viernesDesde,element.viernesHasta)
        element.sabado= this.generarTurnos(element.sabadoDesde,element.sabadoHasta)
        
      });
    })*/
    
  }
  espSelecionado(esp){
    this.espSelect=esp
    this.mostrarEspecialidades=false;
    this.mostrarProfesionales=true;
    /*this.horarioService.profPorEspecialidad(esp)
    .subscribe(prof=>{
      this.listaProfesionales=prof
      
    })*/
  }
  vuelta(sec){
    if(sec == 'especialidad'){
      this.mostrarEspecialidades=true;
      this.mostrarProfesionales=false;
    }
    if(sec == 'turnos'){
      this.mostrarTurnos=false;
      this.mostrarProfesionales=true;
    }
  }
  profecionalSelect(prof){
    this.mostrarProfesionales=false;
    this.mostrarTurnos=true;
    this.profSelect=prof
  }

  
  /*profSelect(h){
    this.turnosDe=h
  }

  generarTurnos(hDesde,hHasta){
    
    if(hDesde){
      let desde = moment(hDesde, 'HH:mm'); 
      let hasta = moment(hHasta, 'HH:mm');  
      let diferencia=hasta.diff(desde, 'hours')*2
      
      let turnos=[]
      for(let i=0;i<diferencia;i++){
        
        turnos.push(desde.format('HH:mm'))
        desde=desde.add(30, 'minutes')
      }
      return turnos
    }
    
  }*/
  ngOnInit(): void {
  }


}

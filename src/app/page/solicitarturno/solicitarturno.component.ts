import { Component, OnInit } from '@angular/core';
import { ProfhorariosService } from 'src/app/servicios/profhorarios.service';
import * as moment from 'moment';

@Component({
  selector: 'app-solicitarturno',
  templateUrl: './solicitarturno.component.html',
  styleUrls: ['./solicitarturno.component.css']
})
export class SolicitarturnoComponent implements OnInit {

  
  searchText:string
  searchProfesional:string
  listaHorarios=[]
  turnosDe:any

  
  constructor(private horarioService:ProfhorariosService) { 
    horarioService.getAll()
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
    })
    
  }
  profSelect(h){
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
    
  }
  ngOnInit(): void {
  }


}

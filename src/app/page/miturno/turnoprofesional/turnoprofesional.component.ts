import { Component, Input, OnInit } from '@angular/core';
import { TurnoService } from 'src/app/servicios/turno.service';

@Component({
  selector: 'app-turnoprofesional',
  templateUrl: './turnoprofesional.component.html',
  styleUrls: ['./turnoprofesional.component.css']
})
export class TurnoprofesionalComponent implements OnInit {

  @Input() listaTurnosProfesional
  searchText:any
  @Input() renderTable
  comentario:string=''
  selectTurno:any

  dtOptions: DataTables.Settings = {
    paging: false,
    info: false,
    //searching: false,
    language: {
        url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
    }
  }
  constructor(private turnoService:TurnoService) { }

  ngOnInit(): void {
  }

  selectTurnoCambiarEstado(turno,estado){
    turno.cambiarestado=estado
    this.selectTurno=turno

    if(estado == "Aceptado"){
      this.cancelarTurno()
    }
    

  }
 
  cancelarTurno(){
    
    this.turnoService.cambiarEstadoTurno(this.selectTurno.eventId,this.selectTurno.cambiarestado,this.comentario)
    this.comentario=''
    
  }

}

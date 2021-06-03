import { Component, Input, OnInit } from '@angular/core';
import { TurnoService } from 'src/app/servicios/turno.service';

@Component({
  selector: 'app-turnopaciente',
  templateUrl: './turnopaciente.component.html',
  styleUrls: ['./turnopaciente.component.css']
})
export class TurnopacienteComponent implements OnInit {

  @Input() listaTurnosPaciente
  searchText:any
  @Input() renderTable

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

  comentarioCancelacion:string=''
  selectTurno:any

 

  selectTurnoCancel(turno){
    this.selectTurno=turno

  }
 
  cancelarTurno(){
    
    this.turnoService.cambiarEstadoTurno(this.selectTurno.eventId,'Cancelado',this.comentarioCancelacion)
    this.comentarioCancelacion=''
    
  }

}

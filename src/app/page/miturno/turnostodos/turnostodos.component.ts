import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TurnoService } from 'src/app/servicios/turno.service';

@Component({
  selector: 'app-turnostodos',
  templateUrl: './turnostodos.component.html',
  styleUrls: ['./turnostodos.component.css']
})
export class TurnostodosComponent implements OnInit {

  @Input() listaTurnos
  @Input() renderTable
  searchText:string
  selectTurno:any
  formBase=new FormGroup({
    comentario:new FormControl('',[Validators.required])
  })
  constructor(private turnoService:TurnoService) { 
  }

  ngOnInit(): void {
  }

  selectTurnoCambiarEstado(turno,estado){
    turno.cambiarestado=estado
    this.selectTurno=turno
    console.log(this.selectTurno)
  }

  guardarInfo(){
    let obj={comentario:this.formBase.getRawValue().comentario}
  
    obj['estado']=this.selectTurno.cambiarestado
    
    this.turnoService.cambiarEstadoTurno(this.selectTurno,obj)
    
  }

}

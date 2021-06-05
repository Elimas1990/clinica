import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  formBase=new FormGroup({
    comentario:new FormControl('',[Validators.required])
  })
  formEncuesta:FormGroup

  constructor(private turnoService:TurnoService,
    private fb:FormBuilder) { 
      this.formEncuesta = this.formBase
    }

  ngOnInit(): void {
  }

  comentarioCancelacion:string=''
  selectTurno:any

 

  selectTurnoCambiarEstado(turno,estado,tipocoment){
    turno.cambiarestado=estado
    turno.tipocoment=tipocoment
    this.selectTurno=turno
    this.formEncuesta = this.formBase
  
    /*if(estado == "Aceptado"){
      this.guardarInfo()
    }
    if(estado == "Finalizado"){
      this.agregarAHitoria()
    }*/
  }

  guardarInfo(){
    let obj={}
    if(this.selectTurno.cambiarestado != "Finalizado"){
      obj={comentario:this.formEncuesta.getRawValue().comentario}

      obj['estado']=this.selectTurno.cambiarestado
    }else{
      obj[this.selectTurno.tipocoment]=this.formEncuesta.getRawValue().comentario
    }
    
    console.log(obj)
    /*
    switch(this.selectTurno.cambiarestado){
      case 'Cancelado':
      case 'Rechazado':
        break;
      case 'Finalizado':
        obj['historia']=this.formEncuesta.getRawValue()
    
        delete obj['historia'].comentario

        for(let i=1;i<=this.cantCampos;i++){
          obj['historia'][this.formEncuesta.getRawValue()['campo'+i]]=this.formEncuesta.getRawValue()['value'+i]
          delete obj['historia']['campo'+i]
          delete obj['historia']['value'+i]
        }
        break;
      case 'Aceptado':
        delete obj.comentario
        break;
      default:
        break;
    }
    this.turnoService.cambiarEstadoTurno(this.selectTurno,obj)
    */
    this.turnoService.cambiarEstadoTurno(this.selectTurno,obj)
  }
 
  agregarAHitoria(){
    this.formEncuesta = this.fb.group({
      ...this.formBase.controls,
      altura: ['', Validators.required],
      peso:['', Validators.required],
      temp:['', Validators.required],
      presion:['', Validators.required]
    })

    
  }
  htmlToAdd:any=''
  cantCampos:number=0
  agregarCampos(operacion){
    if(this.cantCampos<=3 && this.cantCampos>=0){
      if(operacion){
        this.cantCampos=this.cantCampos + 1
        this.addControl(this.cantCampos)
      }
        else{
          this.removeControl(this.cantCampos)
          this.cantCampos=this.cantCampos -1
      }
    }
  }

  addControl(numero){
    this.formEncuesta.addControl('campo'+numero, new FormControl('', Validators.required))
    this.formEncuesta.addControl('value'+numero, new FormControl('', Validators.required))
  }
  removeControl(numero){
    this.formEncuesta.removeControl('campo'+numero)
    this.formEncuesta.removeControl('value'+numero)
  }
  cancelarTurno(){
    
    //this.turnoService.cambiarEstadoTurno(this.selectTurno.eventId,'Cancelado',this.comentarioCancelacion)
    this.comentarioCancelacion=''
    
  }

}

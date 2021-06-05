import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  formBase=new FormGroup({
    comentario:new FormControl('',[Validators.required])
  })
  formHistoriaClinica:FormGroup

  constructor(private turnoService:TurnoService,
    private fb:FormBuilder) { 
      this.formHistoriaClinica = this.formBase
    }

  ngOnInit(): void {
  }

  agregarAHitoria(){
    this.formHistoriaClinica = this.fb.group({
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
    this.formHistoriaClinica.addControl('campo'+numero, new FormControl('', Validators.required))
    this.formHistoriaClinica.addControl('value'+numero, new FormControl('', Validators.required))
  }
  removeControl(numero){
    this.formHistoriaClinica.removeControl('campo'+numero)
    this.formHistoriaClinica.removeControl('value'+numero)
  }

  selectTurnoCambiarEstado(turno,estado){
    turno.cambiarestado=estado
    this.selectTurno=turno
    this.formHistoriaClinica = this.formBase
    if(estado == "Aceptado"){
      this.guardarInfo()
    }
    if(estado == "Finalizado"){
      this.agregarAHitoria()
    }
  }
 
  guardarInfo(){
    let obj={comentario:this.formHistoriaClinica.getRawValue().comentario}
    console.log(this.selectTurno.cambiarestado)
    
    obj['estado']=this.selectTurno.cambiarestado
    
    switch(this.selectTurno.cambiarestado){
      case 'Cancelado':
      case 'Rechazado':
        break;
      case 'Finalizado':
        obj['historia']=this.formHistoriaClinica.getRawValue()
    
        delete obj['historia'].comentario

        for(let i=1;i<=this.cantCampos;i++){
          obj['historia'][this.formHistoriaClinica.getRawValue()['campo'+i]]=this.formHistoriaClinica.getRawValue()['value'+i]
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
    
  }

}

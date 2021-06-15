import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { AuthService } from 'src/app/servicios/auth.service';
import { TurnoService } from 'src/app/servicios/turno.service';


@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {

  @Input() profSelect
  @Output() vuelta= new EventEmitter

  fechaHoy:Date=new Date

  fechas=[]

  constructor(private authService:AuthService,
    private turnosService:TurnoService) { }

  ngOnInit(): void {
    if(Number(moment(this.fechaHoy).format('H')) > 18){
      this.setFechas(1)
    }else{
      this.setFechas(0)
    }
  }


  setFechas(sum){
    let cantidadDias=10
    for(let i=0+sum; i<cantidadDias+sum ;i++){

      this.fechaHoy=new Date
      let diaSiguiente=this.fechaHoy.setDate( this.fechaHoy.getDate() + i )
      moment.locale('es');
      let fechasDisponibles=this.profSelect[moment(diaSiguiente).format('dddd').normalize('NFD').replace(/[\u0300-\u036f]/g,"")]

      if(fechasDisponibles){
        fechasDisponibles.desde
        let turnos=[]
        let dif=fechasDisponibles.hasta-fechasDisponibles.desde
        let horaFormat=moment(fechasDisponibles.desde,'k')
        
        if(this.profSelect.tiempobloque == 30){
          dif=dif*2
        }
        for(let i=0;i<dif;i++){
          let obj={
            hora:horaFormat.format('HH:mm'),
            ocupado:false
          }
          this.turnosService
          .getTurnoHorario(this.profSelect.email,this.profSelect.espselect,moment(moment(new Date(diaSiguiente)).format('DD/MM/yyyy')+horaFormat.format(' HH:mm'),'DD/MM/yyyy HH:mm'))
          .subscribe(x => {
            x.forEach(element => {
              if(element.estado != 'Rechazado' && element.estado != 'Cancelado'){
                obj.ocupado=true
              }
            })
          })
          turnos.push(obj)
          horaFormat=horaFormat.add(this.profSelect.tiempobloque, 'minutes')        
        }        
        this.fechas.push({fecha:diaSiguiente,turnos:turnos});
      }else{
        cantidadDias++
      }
    }
  }

  turnoSelect:any
  reservarTurno(fecha,bloq){
    console.log(fecha)
    console.log(bloq)
    let f=moment(fecha).utcOffset("-03:00")
    f.set({hour:Number(moment(bloq,'HH mm').format('H')),minute:Number(moment(bloq,'HH mm').format('m')),second:0,millisecond:0})
    this.authService.auth.user
    .forEach(x=>{
      this.authService.getUserInfoByEmail2(x?.email).subscribe((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            
            let obj={
              fecha:f.toDate(),
              turno:bloq,
              nombreProf:this.profSelect.nombre,
              apellidoProf:this.profSelect.apellido,
              especialidad:this.profSelect.espselect,
              duracion:this.profSelect.tiempobloque,
              emailProfesional:this.profSelect.email,
              emailPaciente:doc.data()['email'],
              nombrePaciente:doc.data()['nombre'],
              apellidoPaciente:doc.data()['apellido'],
              estado:'Solicitado'
            }
            this.turnosService.create(obj)
            this.turnoSelect=obj
            $('#btnmodal').trigger( "click" )
        });
    });})
    /*this.authService.auth.user
    .forEach(x=>{
      console.log(x)
      if(x?.email){
        this.authService.getUserInfoByEmail(x.email)
        .subscribe(dat=>{
          let obj={
            fecha:f.toDate(),
            turno:bloq,
            nombreProf:this.profSelect.nombre,
            apellidoProf:this.profSelect.apellido,
            especialidad:this.profSelect.espselect,
            duracion:this.profSelect.tiempobloque,
            emailProfesional:this.profSelect.email,
            emailPaciente:dat[0].email,
            nombrePaciente:dat[0].nombre,
            apellidoPaciente:dat[0].apellido,
            estado:'Solicitado'
          }
          this.turnosService.create(obj)
          this.turnoSelect=obj
          $('#btnmodal').trigger( "click" )
        })
      }
    })*/
  }

  volver(){
    this.vuelta.emit('turnos')
    
  }
}

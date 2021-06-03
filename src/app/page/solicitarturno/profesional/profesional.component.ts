import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { ProfhorariosService } from 'src/app/servicios/profhorarios.service';
import { StorageService } from 'src/app/servicios/storage.service';

@Component({
  selector: 'app-profesional',
  templateUrl: './profesional.component.html',
  styleUrls: ['./profesional.component.css']
})
export class ProfesionalComponent implements OnInit {

  @Input() espSelect
  @Output() vuelta= new EventEmitter
  @Output() profSelect= new EventEmitter

  listaProfesionales=[]
  constructor(private authService:AuthService,
    private storageService:StorageService,
    private horarioService:ProfhorariosService) { 
    
  }

  
  ngOnInit(): void {
    this.authService.userEspecialidad(this.espSelect.especialidad)
    .subscribe(x=>{
      x.forEach(element => {
        /*this.storageService.storage.ref(element.img).getDownloadURL()
        .subscribe(x => element.img=x)*/
        this.horarioService.devolverHorario(element.email,this.espSelect.especialidad)
        .subscribe(x=> {
          x.forEach(hora => {
            element.hora=hora.data()
          })
        })
      })
      this.listaProfesionales=x
    })
  }
  mostrarHora(h){
    return(h*3600*1000)+10800000
  }

  selectProfesional(prof){
    prof.hora.espselect=this.espSelect.especialidad
    this.profSelect.emit(prof.hora)

  }
  volver(){
    this.vuelta.emit('especialidad')
  }
}

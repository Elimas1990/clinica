import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { TurnoService } from 'src/app/servicios/turno.service';

@Component({
  selector: 'app-miturno',
  templateUrl: './miturno.component.html',
  styleUrls: ['./miturno.component.css']
})
export class MiturnoComponent implements OnInit {

  listaTurnos=[]
  listaTurnosPaciente=[]
  listaTurnosProfesional=[]
  renderTable:boolean=false
  tipoUsuario:any

  constructor(private turnosService:TurnoService,
    private authService:AuthService) { 
      authService.auth.user
      .subscribe(x => {
        if(x?.email){
          authService.getUserInfoByEmail(x.email)
          .subscribe(x => {
            this.tipoUsuario=x[0]
            switch(this.tipoUsuario.tipouser){
              case 'Paciente':
                this.turnosService.getTurnoX(this.tipoUsuario.email,'emailPaciente')
                .subscribe(x=>{
                  this.listaTurnosPaciente=x
                  this.renderTable=true
                })
                
                break;
              case 'Profesional':
                this.turnosService.getTurnoX(this.tipoUsuario.email,'emailProfesional')
                .subscribe(x=>{
                  this.listaTurnosProfesional=x
                  this.renderTable=true
                })
                break;
              case 'Administrativo':
                this.turnosService.getAll()
                .subscribe(x=>{
                  this.listaTurnos=x
                  this.renderTable=true
                })
                break;
            }
          })
        }
      })
  }
  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
    this.dtOptions
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { TurnoService } from 'src/app/servicios/turno.service';

@Component({
  selector: 'app-miturno',
  templateUrl: './miturno.component.html',
  styleUrls: ['./miturno.component.css']
})
export class MiturnoComponent implements OnInit {

  listaTurnosPaciente=[]
  listaTurnosProfesional=[]
  renderTable:boolean=false
  tipoUsuario:any

  constructor(private turnosService:TurnoService,
    private authService:AuthService) { 
      authService.auth.user
      .subscribe(x => {
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
              console.log(this.tipoUsuario.email)
              this.turnosService.getTurnoX(this.tipoUsuario.email,'emailProfesional')
              .subscribe(x=>{
                console.log(x)
                this.listaTurnosProfesional=x
                this.renderTable=true
              })
              break;
            case 'Administrativo':
              this.turnosService.getTurnoX(this.tipoUsuario.email,'emailPaciente')
              .subscribe(x=>{
                this.listaTurnosPaciente=x
                this.renderTable=true
              })
              break;
          }
        })
      })
  }
  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
    this.dtOptions
  }

}

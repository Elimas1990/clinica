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

  constructor(private turnosService:TurnoService,
    private authService:AuthService) { 
      authService.auth.user
      .subscribe(x => {
        authService.getUserInfoByEmail(x.email)
        .subscribe(x => {
          switch(x[0].tipouser){
            case 'Paciente':
              this.turnosService.getTurnoX(x[0].email,'emailPaciente')
              .subscribe(x=>{
                this.listaTurnosPaciente=x
              })
              break;
            case 'Profesional':
              this.turnosService.getTurnoX(x[0].email,'emailProf')
              .subscribe(x=>{
                this.listaTurnosProfesional=x
              })
              break;
            case 'Administrativo':
              this.turnosService.getTurnoX(x[0].email,'emailPaciente')
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

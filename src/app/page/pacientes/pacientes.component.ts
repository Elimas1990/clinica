import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { TurnoService } from 'src/app/servicios/turno.service';
import { map} from 'rxjs/operators';
import { unique } from 'jquery';
@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {

  listaPacientes=[]
  constructor(private authService:AuthService,
    private turnosService:TurnoService) { 
      this.authService.auth.user.subscribe(u => {
          turnosService.getTurnoX(u?.email,'emailProfesional')
          .subscribe(x=> {
            let uniqueAges = [...new Set( x.map(obj => obj.emailPaciente)) ];
            uniqueAges.forEach(element => {
              authService.getUserInfoByEmail(element)
              .subscribe(x=>{
                x.forEach(element => {

                  turnosService.get3UltimosTurnos(element.email,u.email)
                  .valueChanges({ idField: 'eventId' })
                  .subscribe(turnos=> x[0].turnos=turnos)

                  this.listaPacientes.push(x[0])
                });
                
                //console.log(x)
                })
            })
          })
        }
        
      )
    }

  ngOnInit(): void {
  }

  userSelect:any
  emailUser(email){
    this.userSelect=email
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { TurnoService } from 'src/app/servicios/turno.service';

@Component({
  selector: 'app-historiaclinica',
  templateUrl: './historiaclinica.component.html',
  styleUrls: ['./historiaclinica.component.css']
})
export class HistoriaclinicaComponent implements OnInit {

  listaHistoriaClinica=[]
  constructor(private authService:AuthService,
    private turnosService:TurnoService) {
    authService.auth.user.subscribe(x => {
      turnosService.getHistoriaClinica(x.email)
      .subscribe(x=>{
        this.listaHistoriaClinica=x
      })
    })
   }

  ngOnInit(): void {
  }

}

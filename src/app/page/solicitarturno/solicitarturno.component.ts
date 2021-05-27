import { Component, OnInit } from '@angular/core';
import { ProfhorariosService } from 'src/app/servicios/profhorarios.service';


@Component({
  selector: 'app-solicitarturno',
  templateUrl: './solicitarturno.component.html',
  styleUrls: ['./solicitarturno.component.css']
})
export class SolicitarturnoComponent implements OnInit {

  
  searchText:string
  searchProfesional:string
  listaHorarios=[]
  listaLunes

  
  constructor(private horarioService:ProfhorariosService) { 
    horarioService.getAll()
    .subscribe(x => {
      this.listaHorarios=x
      x.forEach(element => {
        element.apellido
        console.log(element.lunesDesde)
        console.log(element.lunesHasta)
      });
    })
    
  }

  ngOnInit(): void {
  }


}

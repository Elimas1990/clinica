import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-verturnos',
  templateUrl: './verturnos.component.html',
  styleUrls: ['./verturnos.component.css']
})
export class VerturnosComponent implements OnInit {

  @Input() turnosDe

  fechaHoy= new Date
  fechasAmostrar=[]
  constructor() { }
  

  ngOnInit(): void {
    for(let i=0;i<6;i++){

      //let dSemana=moment(this.fechasAmostrar[i]).format('ddd')
      //console.log(dSemana)
      
      this.fechaHoy.setDate(this.fechaHoy.getDate()+i)
      console.log(this.fechaHoy)
      this.fechasAmostrar[i]=this.fechaHoy
    }
    console.log(this.fechasAmostrar)
  }

}

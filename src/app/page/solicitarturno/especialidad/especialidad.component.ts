import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.css']
})
export class EspecialidadComponent implements OnInit {

  @Input() listaEspecialidades
  @Output() espSelecionado= new EventEmitter<any>()
  color='cyan'
  constructor(private route:Router) { }

  ngOnInit(): void {
  }

  selectEspecialidad(esp){
    this.espSelecionado.emit(esp)
  }
  volver(){
    this.route.navigate([''])
  } 

}

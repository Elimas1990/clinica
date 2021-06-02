import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.css']
})
export class BienvenidoComponent implements OnInit {

  misturnosimg="./../../../assets/departments-3.jpg";
  sacarturnos="./../../../assets/departments-5.jpg"; 
  constructor() { }

  ngOnInit(): void {
  }

}

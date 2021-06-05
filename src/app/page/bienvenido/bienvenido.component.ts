import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.css']
})
export class BienvenidoComponent implements OnInit {

  usuarioLogin:any;
  userData:any;
  misturnosimg="./../../../assets/departments-3.jpg";
  sacarturnos="./../../../assets/departments-5.jpg"; 
  constructor(private authService:AuthService) {

    this.authService.auth.user.subscribe(x=> {
      this.usuarioLogin=x
      if(x){
        this.authService.db.collection('/usuarios', ref => ref.where('email','==', x?.email ))
        .valueChanges()
        .subscribe((response) => {
          this.userData=response[0]
          
        });
      }
      
    })
   }

  ngOnInit(): void {
  }

}

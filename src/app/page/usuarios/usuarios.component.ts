
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  listaUsers=[]
  render:boolean=false
  dtOptions: DataTables.Settings = {
    paging: false,
    info: false,
    language: {
        url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
    }
  }
  constructor(private authService:AuthService) {
    authService.getAll().subscribe(user=>{
      this.listaUsers=user
      this.render=true
    })
  }

  ngOnInit(): void {
  }

  statusProfesional(email,status){
    let mod={
      estado: !status
    }
    this.authService.cambiarInfo(email,mod)
  }

}

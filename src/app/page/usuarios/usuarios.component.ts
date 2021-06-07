
import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { Observable } from 'rxjs';
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
  userSelect:any
  emailUser(email){
    this.userSelect=email
  }
  constructor(private authService:AuthService) {

    this.authService.getUserList().subscribe(res => {
      this.listaUsers=res
      /*this.listaUsers=res.map( e => {
          let data=e.payload.doc.data()
          data['id']=e.payload.doc.id
          this.render=true
          return data
      })*/
    }); 


  }

  ngOnInit(): void {
  }

  statusProfesional(id,estado){
    let mod={estado:true}
    if(estado){
      mod.estado=false
    }
    this.authService.updateUser(id,mod)
  }


}

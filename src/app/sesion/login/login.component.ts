import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogueado={email :'',pass:''}
  errorUsuario=false;
  verUsers=false;
  users:any
  usuariosPreCargados=[]
  constructor(private authService:AuthService,
    private route:Router) {
      
    this.cargarPreCartados('estebanlimas@hotmail.com')
    this.cargarPreCartados('soledadpoli@hotmail.com')
    this.cargarPreCartados('estebanlimas@gmail.com')
      console.log(this.usuariosPreCargados)
    this.authService.getAll().subscribe(user => {
      this.users=user
    });
   }

  cargarPreCartados(email){
    this.authService.getUserInfoByEmail(email)
    .subscribe(x=>{
      x[0].pass="222222"
        this.usuariosPreCargados.push(x[0])
      })
  }
  ngOnInit(): void {
  }
  autoCompletarUsuario(user){
    switch(user){
      case "admin":
        this.userLogueado={email :'estebanlimas@hotmail.com',pass:'222222'}
        break;
      case "paciente":
        this.userLogueado={email :'soledadpoli@hotmail.com',pass:'222222'}
        break;
      case "profesional":
        this.userLogueado={email :'estebanlimas@gmail.com',pass:'222222'}
        break;
    }
    

  }
  async loginUsuario(){
    try{
      const user= await this.authService.login(this.userLogueado.email,this.userLogueado.pass)
     if(user && user.user.emailVerified){

      this.errorUsuario=false
      this.route.navigate([''])
     }else{
      if(!user.user.emailVerified){
        this.route.navigate(['sesion/verifica-email'])
      }
      this.errorUsuario=true
     }
    }
    catch(error){
      console.log(error);
    }
  }

}

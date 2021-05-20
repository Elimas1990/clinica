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
  users:any
  constructor(private authService:AuthService,
    private route:Router) {
    this.authService.getAll().subscribe(user => {
      this.users=user
    });
   }

  ngOnInit(): void {
  }
  autoCompletarUsuario(user){
    switch(user){
      case "admin":
        this.userLogueado={email :'estebanlimas@hotmail.com',pass:'222222'}
        break;
      case "paciente":
        this.userLogueado={email :'estebanlimas@hotmail.com',pass:'222222'}
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

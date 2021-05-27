import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: Observable<any>=this.authService.auth.user;
  userlogin=false
  userAdmin=false
  user2:any;
  
 
  constructor(private authService:AuthService,
    private route:Router) {

      this.authService.auth.user.subscribe(x=> {
        if(x){
          this.authService.db.collection('/usuarios', ref => ref.where('email','==', x?.email ))
          .valueChanges()
          .subscribe((response) => {
            this.user2 = response[0]
            this.userlogin=true
            if(this.user2.tipouser == "Administrativo"){
              this.userAdmin=true}
              else{
                this.userAdmin=false
              }
          });
        }
        
      })
      
  }

  ngOnInit(): void {
  }

  async desloguear(){
    try{
      this.authService.logout();
      this.route.navigate(['']);
    }
    catch(error){
      console.log(error)
    }
  }

  esAdmin(){
    
  }

}

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

  public user: Observable<any>=this.authService.auth.user;
  public user2=localStorage.getItem('user')
 
  constructor(private authService:AuthService,
    private route:Router) {
      
      this.user.subscribe(x => {
        //console.log(x.email)
        //this.user2=authService.userInfo(x.email)
        //this.user2=JSON.stringify(x[0])
        //this.user2=authService.userInfo(x[0]?.email)
        //console.log(this.user2)
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

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
  public user2:any;
 
  constructor(private authService:AuthService,
    private route:Router) {
      this.authService.auth.user.subscribe(x=> {
        this.authService.db.collection('/usuarios', ref => ref.where('email','==', x.email ))
        .valueChanges()
        .subscribe((response) => {
          console.log(response[0])
          this.user2 = response;
      });
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

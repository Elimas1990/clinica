import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../servicios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosGuard implements CanActivate {
  userData:any;
  constructor(private authService:AuthService){
    this.authService.auth.user.subscribe(x=> {
      this.authService.db.collection('/usuarios', ref => ref.where('email','==', x?.email ))
        .valueChanges()
        .subscribe((response) => {
        this.userData=response[0]
      });
    })
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let user=JSON.parse(localStorage.getItem('user'))
      if(this.userData?.tipouser == 'Administrativo' && this.userData?.estado){
        return true
      }else{
        return false;
      }
  }
  
}

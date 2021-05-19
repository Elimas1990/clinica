import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Usuario } from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuario:string;

  private dbpath='/usuarios';
  dataUsuarios:AngularFirestoreCollection<any>;
  users: Observable<Usuario[]>

  constructor(private db: AngularFirestore,
    public auth: AngularFireAuth) { 
    this.dataUsuarios=db.collection<any>(this.dbpath)
    this.users = this.dataUsuarios.valueChanges()
  }

  async login(email:string,pass:string){
    try{
      const result= await this.auth.signInWithEmailAndPassword(email,pass);
      localStorage.setItem('user', email);
      return result;
    }
    catch (error){
      //console.log(console.error())
    }

  }
  async register(usuario:any){
    try{
      const result= await this.auth.createUserWithEmailAndPassword(usuario.email,usuario.pass);
      //this.create(usuario)
      return result;

    }
    catch (error){
      //console.log(console.error())
      return error
    }
    
  }
  async logout(){
    try{
      await this.auth.signOut();
      localStorage.removeItem('user');
    }
    catch (error){
      //console.log(console.error())
    }
    
  }
  async getCurrentUser(){
    return this.auth.authState.pipe(first()).toPromise();
  }
  getAll(){
    return this.users;
  }
  
  create(usuario:any):any{
    return this.dataUsuarios.add({...usuario});

  }
}

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Usuario } from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuario:string;
  public userdata:Observable<any>
  private dbpath='/usuarios';
  dataUsuarios:AngularFirestoreCollection<any>;
  users: Observable<any>

  constructor(private db: AngularFirestore,
    public auth: AngularFireAuth) { 
    this.dataUsuarios=db.collection<any>(this.dbpath)
    this.users = this.dataUsuarios.valueChanges()
  }

  async sendVerificationEmail(){
    return (await this.auth.currentUser).sendEmailVerification();
  }
  async userInfo(email) {
    this.db.collection(this.dbpath, ref => ref.where('email','==', email ))
    .valueChanges()
    .subscribe(x => {
      localStorage.setItem('user', JSON.stringify(x[0]));
      
      return x[0]
    })
    
  }



  async login(email:string,pass:string){
    try{
      
      
      
      const result= await this.auth.signInWithEmailAndPassword(email,pass);
      const data =   await this.userInfo(email)
      

      
      return result;
    }
    catch (error){
      console.log(console.error())
    }

  }
  async register(usuario:any){
    try{
      const result= await this.auth.createUserWithEmailAndPassword(usuario.email,usuario.pass);
      this.sendVerificationEmail()
      return result;

    }
    catch (error){
      return error
    }
    
  }
  async logout(){
    try{
      await this.auth.signOut();
      localStorage.removeItem('user');
    }
    catch (error){
    }
    
  }
  id:any
  cambiarInfo(email,mod) {
    
    const docRef=this.db.collection(this.dbpath, ref => ref.where('email','==', email ))
    docRef.snapshotChanges().subscribe((x: any)=> {
      this.id=x[0].payload.doc.id
      console.log(mod)
      console.log(this.id)
      this.db.collection(this.dbpath).doc(this.id).update(mod);
    })
    

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

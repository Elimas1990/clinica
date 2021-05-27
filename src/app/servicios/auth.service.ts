import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { first, map,  } from 'rxjs/operators';
import { Usuario } from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuario:string;
  userdata:Observable<any>
  private dbpath='/usuarios';
  dataUsuarios:AngularFirestoreCollection<any>;
  users: Observable<any>
  id:any;

  constructor(public db: AngularFirestore,
    public auth: AngularFireAuth) { 
    this.dataUsuarios=db.collection<any>(this.dbpath)
    this.users = this.dataUsuarios.valueChanges()
  }

  async sendVerificationEmail(){
    return (await this.auth.currentUser).sendEmailVerification();
  }
  

  async login(email:string,pass:string){
    try{

      const result= await this.auth.signInWithEmailAndPassword(email,pass);
      this.userInfo(email)
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

  async userInfo(email) {
    this.auth.user.subscribe(x=> {
      if(x){
        let info=this.db.collection(this.dbpath, ref => ref.where('email','==', x.email )).valueChanges()
        info.subscribe(x =>localStorage.setItem('user', JSON.stringify(x[0])))
        return info
      }
      
    })
    
  }

  
  
  async cambiarInfo(email,mod) {
    
    const docRef=this.db.collection(this.dbpath, ref => ref.where('email','==', email ))
    docRef.snapshotChanges().subscribe((x: any)=> {
      this.id=x[0].payload.doc.id
      //this.db.collection(this.dbpath).doc(this.id).update(mod);
    })
    
    await this.db.collection(this.dbpath).doc(this.id).update(mod);

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
  

  getUserDoc(id) {
    return this.db
    .collection(this.dbpath)
    .doc(id)
    .valueChanges()
  }

  getUserList() { 
    return this.db
    .collection(this.dbpath)
    .snapshotChanges();
  }

  createUser(user) {
    return new Promise<any>((resolve, reject) =>{
      this.db
        .collection(this.dbpath)
        .add(user)
        .then(response => { console.log(response) }, error => reject(error));
    });
  }

  deleteUser(user) {
    return this.db
      .collection(this.dbpath)
      .doc(user.id)
      .delete();
  }
  
  updateUser(id, mod) {
    return this.db
      .collection(this.dbpath)
      .doc(id)
      .update(mod);
  }

}

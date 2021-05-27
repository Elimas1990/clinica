import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfhorariosService {

  dbpath:string='/horarios'
  dataHorarios:AngularFirestoreCollection<any>;
  horarios: Observable<any>
  constructor(public db: AngularFirestore) { 
    this.dataHorarios=db.collection<any>(this.dbpath)
    this.horarios = this.dataHorarios.valueChanges()
  }

  create(horario:any):any{
    return this.dataHorarios.add({...horario});

  }
  getAll(){
    return this.horarios;
  }
  va:any
  devolverHorario(email,especialidad):Observable<any>{

    let subject=new Subject<any>()
    const info= this.db.collection(this.dbpath, ref => ref.where('email','==', email ).where('especialidad','==', especialidad))
    .get()
    .subscribe(x =>{
      subject.next(x)
    })
    return subject.asObservable();
  }

  async eliminarSetHorario(id){
    return await this.db.collection(this.dbpath).doc(id).delete();
  }
}

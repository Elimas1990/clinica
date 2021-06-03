import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  dbpath:string='/turnos'
  dataTurnos:AngularFirestoreCollection<any>;
  turnos: Observable<any>
  constructor(public db: AngularFirestore) { 
    this.dataTurnos=db.collection<any>(this.dbpath)
    this.turnos = this.dataTurnos.valueChanges()
  }

  create(turno:any):any{
    return this.dataTurnos.add({...turno});

  }
  getAll(){
    return this.turnos;
  }

  getTurno(email,especialidad):Observable<any>{

    let subject=new Subject<any>()
    const info= this.db.collection(this.dbpath, ref => ref.where('especialidad','==', especialidad ).where('emailProfesional','==', email ))
    .valueChanges()
    .subscribe(x =>{
      subject.next(x)
    })
    return subject.asObservable();
  }

  getTurnoX(valor,campo):Observable<any>{
  
    let subject=new Subject<any>()

    this.db.collection(this.dbpath, ref => ref.where(campo,'==', valor ))
    .valueChanges({ idField: 'eventId' })
    .subscribe(x =>{
      subject.next(x)
    })
    return subject.asObservable();
  }

  getTurnoHorario(email,especialidad,fecha):Observable<any>{
  
    let subject=new Subject<any>()

    this.db.collection(this.dbpath, ref => ref.where('especialidad','==', especialidad ).where('emailProfesional','==', email ).where('fecha','==', fecha.toDate() ))
    .valueChanges()
    .subscribe(x =>{
      subject.next(x)
    })
    return subject.asObservable();
  }

  horarioProf(email,especialidad):Observable<any>{

    let subject=new Subject<any>()
    const info= this.db.collection(this.dbpath, ref => ref.where('email','==', email ).where('especialidad','==', especialidad))
    .get()
    .subscribe(x =>{
      subject.next(x)
    })
    return subject.asObservable();
  }

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

  async cambiarEstadoTurno(turno,estado){
    
    return await this.db.collection(this.dbpath).doc(turno).update({estado: estado})

  }
}

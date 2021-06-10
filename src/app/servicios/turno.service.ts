import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  dbpath:string='/turnos'
  dataTurnos:AngularFirestoreCollection<any>;
  turnos: Observable<any>
  constructor(public db: AngularFirestore) { 
    this.dataTurnos=db.collection<any>(this.dbpath)
    this.turnos = this.dataTurnos.valueChanges({ idField: 'eventId' })
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

  get3UltimosTurnos(emailPaciente,emailProfesional){
    
    return  this.db.collection(this.dbpath, ref => 
      ref.where('emailPaciente','==', emailPaciente )
      .where('emailProfesional','==', emailProfesional )
      .where('estado','==', 'Finalizado' )
      .orderBy('fecha','desc')
      .limit(3))

  }

  getCantPorDia(fecha){
    let ref=this.db.collection(this.dbpath, ref => 
    ref.where('fecha','>=', moment(fecha,'DD/MM/YYYY').toDate() ).where('fecha','<', moment(fecha,'DD/MM/YYYY').add(1, 'days').toDate() ))
    let snapshot=ref.get()
    return snapshot
  }
  getCantPorDiaPorProfesional(fecha,prof){
  
    let ref=this.db.collection(this.dbpath, ref => 
    ref.where('emailProfesional','==', prof) 
    .where('fecha','>=', moment(fecha,'DD/MM/YYYY').toDate() )
    .where('fecha','<', moment(fecha,'DD/MM/YYYY').add(1, 'days').toDate() ))
    let snapshot=ref.get()
    return snapshot
  }

  getMinMaxFechaTurnoSolicitado(orden){
    let ref=this.db.collection(this.dbpath, ref => ref.orderBy('fecha', orden ).limit(1))
    let snapshot=ref.get()
    return snapshot
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

  async cambiarEstadoTurno(estado,comentario){
    let obj=comentario
    if(estado =="Aceptado"){
      delete obj.comentario
    }
    /*if(estado !="Aceptado"){
      obj['comentario']=comentario
    }*/
    return await this.db.collection(this.dbpath).doc(estado.eventId).update(obj)

  }
  getHistoriaClinica(email,campo):Observable<any>{
  
    let subject=new Subject<any>()

    if(campo){
      this.db.collection(this.dbpath, ref => ref.where(campo,'==', email ).where('estado','==', 'Finalizado' ))
      .valueChanges()
      .subscribe(x =>{
        subject.next(x)
      })
    }else{
      this.db.collection(this.dbpath, ref => ref.where('estado','==', 'Finalizado' ).orderBy('fecha','desc'))
      .valueChanges()
      .subscribe(x =>{
        subject.next(x)
      })
    }
    
    return subject.asObservable();
  }

  countByField(especialidad){
    let ref=this.db.collection(this.dbpath, ref => ref.where('especialidad','==', especialidad ).where('estado','==', 'Finalizado' ))
    let snapshot=ref.get()
    return snapshot
  }

  turnosXdia(especialidad){
    let ref=this.db.collection(this.dbpath)
    .get()
    
  }



}


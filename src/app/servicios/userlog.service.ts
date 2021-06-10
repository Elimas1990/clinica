import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserlogService {

  dbpath:string='/loguser'
  dataTurnos:AngularFirestoreCollection<any>;
  turnos: Observable<any>
  constructor(public db: AngularFirestore) { 
    this.dataTurnos=db.collection<any>(this.dbpath,ref => ref.orderBy('fecha','desc'))
    this.turnos = this.dataTurnos.valueChanges({ idField: 'eventId' })
  }
  getAll(){
    return this.turnos;
  }
}
